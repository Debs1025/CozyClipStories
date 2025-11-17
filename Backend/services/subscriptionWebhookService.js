const crypto = require('crypto');

// verify PayMongo signature
async function verifySignature(req) {
  const secret = process.env.SECRET_PAYMONGO_KEY;
  if (!secret) throw Object.assign(new Error('Webhook secret not configured'), { status: 500 });

  const sigHeader = (req.get('Paymongo-Signature') || req.get('paymongo-signature') || '').trim();
  if (!sigHeader) throw Object.assign(new Error('Missing Paymongo-Signature header'), { status: 400 });

  const raw = req.body;
  if (!raw || !Buffer.isBuffer(raw)) throw Object.assign(new Error('Invalid raw body'), { status: 400 });

  const expected = crypto.createHmac('sha256', secret).update(raw).digest('hex');
  let sigBuf;
  try { sigBuf = Buffer.from(String(sigHeader), 'hex'); } catch (e) { throw Object.assign(new Error('Invalid signature format'), { status: 400 }); }
  const expBuf = Buffer.from(expected, 'hex');
  if (expBuf.length !== sigBuf.length || !crypto.timingSafeEqual(expBuf, sigBuf)) {
    throw Object.assign(new Error('Invalid webhook signature'), { status: 401 });
  }

  return JSON.parse(raw.toString());
}

async function findSubscriptionDoc(db, { subscriptionId, invoiceId }) {
  const col = db.collection('subscriptions');
  if (subscriptionId) {
    const q = await col.where('paymongo.subscriptionId', '==', subscriptionId).limit(1).get();
    if (!q.empty) return q.docs[0];
  }
  if (invoiceId) {
    const q2 = await col.where('paymongo.invoiceId', '==', invoiceId).limit(1).get();
    if (!q2.empty) return q2.docs[0];
  }
  return null;
}

// handle main PayMongo events: invoice.paid, subscription.activated, invoice.payment_failed, subscription.cancelled
async function handlePaymongoWebhook(db, req) {
  const payload = await verifySignature(req);
  const type = payload.type || (payload.data && payload.data.type) || '';
  const data = payload.data || {};
  const attrs = data.attributes || {};
  const invoiceId = data.id || attrs.id || null;
  const subscriptionId = attrs.subscription || attrs.subscription_id || (attrs.subscription && attrs.subscription.id) || null;

  const doc = await findSubscriptionDoc(db, { subscriptionId, invoiceId });
  if (!doc) {
    console.warn('Paymongo webhook: no matching subscription', { subscriptionId, invoiceId, type });
    return;
  }

  const docRef = doc.ref;

  if (type === 'invoice.paid' || type === 'subscription.activated' || attrs.status === 'paid') {
    const now = new Date().toISOString();
    const periodEnd = attrs.current_period_ends || attrs.period_end || attrs.billing_cycle_end || attrs.current_period_end || null;
    const endDate = periodEnd ? new Date(periodEnd).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    const startDate = attrs.current_period_start ? new Date(attrs.current_period_start).toISOString() : (doc.data().startDate || now);

    await docRef.set({
      status: 'active',
      startDate,
      endDate,
      'paymongo.invoiceId': invoiceId || (doc.data().paymongo && doc.data().paymongo.invoiceId) || null,
      'paymongo.subscriptionId': subscriptionId || (doc.data().paymongo && doc.data().paymongo.subscriptionId) || null
    }, { merge: true });
    return;
  }

  if (type === 'invoice.payment_failed' || attrs.status === 'failed' || attrs.status === 'past_due') {
    await docRef.set({ status: 'past_due' }, { merge: true });
    return;
  }

  if (type === 'subscription.cancelled' || attrs.status === 'cancelled') {
    await docRef.set({ status: 'cancelled', endDate: new Date().toISOString() }, { merge: true });
    return;
  }

  return;
}

// expiry checker: mark expired subscriptions as Free/expired
const DAY_MS = 24 * 60 * 60 * 1000;
function isoNow() { return new Date().toISOString(); }
async function runExpiryOnce(db) {
  try {
    const nowISO = isoNow();
    const col = db.collection('subscriptions');
    const q = await col.where('endDate', '<=', nowISO).get();
    if (q.empty) return;
    const batch = db.batch();
    q.docs.forEach(doc => {
      const data = doc.data();
      if (!data) return;
      if (data.status === 'expired' || data.plan === 'Free') return;
      batch.set(doc.ref, { plan: 'Free', status: 'expired' }, { merge: true });
    });
    await batch.commit();
  } catch (e) {
    console.error('Expiry checker error', e);
  }
}

function startExpiryChecker(db, intervalMs = DAY_MS) {
  runExpiryOnce(db);
  setInterval(() => runExpiryOnce(db), intervalMs);
}

module.exports = { handlePaymongoWebhook, startExpiryChecker };