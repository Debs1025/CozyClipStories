const admin = require('firebase-admin');

const COLLECTION = 'subscriptions';
const USERS_COLLECTION = 'users';
const PAYMONGO_BASE = process.env.PAYMONGO_URI;
const PAYMONGO_KEY = process.env.PAYMONGO_KEY;

function paymongoAuthHeader() {
  const k = (PAYMONGO_KEY || '').trim();
  if (!k) return null;
  return `Basic ${Buffer.from(`${k}:`).toString('base64')}`;
}

async function createLocalRecord(userId, plan = 'Free', meta = {}) {
  const db = admin.firestore();
  const userSnap = await db.collection(USERS_COLLECTION).doc(userId).get().catch(() => null);
  const user = userSnap && userSnap.exists ? userSnap.data() : {};
  const now = new Date().toISOString();

  const record = {
    userId,
    userRole: meta.userRole || user.role || 'student',
    userName: meta.name || user.name || null,
    userEmail: meta.email || user.email || null,
    plan,
    status: plan === 'Premium' ? (meta.status || 'pending') : 'active',
    startDate: meta.startDate || now,
    endDate: meta.endDate || null,
    paymongo: meta.paymongo || {}
  };

  await db.collection(COLLECTION).doc(userId).set(record, { merge: true });
  const snap = await db.collection(COLLECTION).doc(userId).get();
  return snap.exists ? snap.data() : record;
}

async function getSubscription(userId) {
  const db = admin.firestore();
  const snap = await db.collection(COLLECTION).doc(userId).get();
  return snap.exists ? snap.data() : null;
}

async function updateSubscription(userId, patch = {}) {
  const db = admin.firestore();
  await db.collection(COLLECTION).doc(userId).set(patch, { merge: true });
  const snap = await db.collection(COLLECTION).doc(userId).get();
  return snap.exists ? snap.data() : null;
}

async function cancelLocal(userId, opts = {}) {
  const db = admin.firestore();
  const patch = { status: 'cancelled', endDate: new Date().toISOString(), ...(opts.patch || {}) };
  await db.collection(COLLECTION).doc(userId).set(patch, { merge: true });
  const snap = await db.collection(COLLECTION).doc(userId).get();
  return snap.exists ? snap.data() : null;
}

async function createPaymongoCustomer(name, email) {
  const auth = paymongoAuthHeader();
  if (!auth) throw Object.assign(new Error('Payment key not configured'), { status: 500 });
  const res = await fetch(`${PAYMONGO_BASE}/customers`, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { attributes: { name, email } } })
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw Object.assign(new Error(`Paymongo customer error: ${txt}`), { status: 502 });
  }
  const j = await res.json();
  return j.data && j.data.id ? j.data.id : null;
}

async function createPaymongoSubscription(customerId, planId) {
  const auth = paymongoAuthHeader();
  if (!auth) throw Object.assign(new Error('Payment key not configured'), { status: 500 });
  const res = await fetch(`${PAYMONGO_BASE}/subscriptions`, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { attributes: { customer: customerId, plan: planId } } })
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw Object.assign(new Error(`Paymongo subscription error: ${txt}`), { status: 502 });
  }
  const j = await res.json();
  return j.data || null;
}

async function createSubscription(userId, { plan = 'Free', name, email, paymongoPlanId = null } = {}) {
  // use user record values if name/email not provided
  const db = admin.firestore();
  const userSnap = await db.collection(USERS_COLLECTION).doc(userId).get().catch(() => null);
  const user = userSnap && userSnap.exists ? userSnap.data() : {};

  const finalName = name || user.name || null;
  const finalEmail = email || user.email || null;
  const userRole = user.role || 'student';

  if (plan === 'Free') {
    return createLocalRecord(userId, 'Free', { name: finalName, email: finalEmail, userRole });
  }

  // Premium flow: create PayMongo customer + subscription, then local record
  if (!paymongoPlanId) throw Object.assign(new Error('Missing paymongoPlanId for premium plan'), { status: 400 });

  const customerId = await createPaymongoCustomer(finalName, finalEmail);
  const sub = await createPaymongoSubscription(customerId, paymongoPlanId);

  const paymeta = {
    customerId,
    subscriptionId: sub && sub.id ? sub.id : null,
    invoiceId: (sub && sub.attributes && sub.attributes.latest_invoice && sub.attributes.latest_invoice.id) || null
  };

  return createLocalRecord(userId, 'Premium', { name: finalName, email: finalEmail, userRole, paymongo: paymeta, status: 'pending' });
}

async function cancelSubscription(userId) {
  const sub = await getSubscription(userId);
  if (sub && sub.paymongo && sub.paymongo.subscriptionId) {
    const auth = paymongoAuthHeader();
    if (auth) {
      await fetch(`${PAYMONGO_BASE}/subscriptions/${sub.paymongo.subscriptionId}`, {
        method: 'DELETE',
        headers: { Authorization: auth }
      }).catch(() => {});
    }
  }
  return cancelLocal(userId);
}

module.exports = {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription
};