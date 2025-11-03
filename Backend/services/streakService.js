const firebase = require('firebase-admin');
const { COLLECTION } = require('../models/streakModel');
const https = require('https');

function toDateKey(d = new Date()) {
  const dt = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  return dt.toISOString().slice(0, 10); // YYYY-MM-DD
}

function yesterdayKey() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return toDateKey(d);
}

async function getRef(userId) {
  const db = firebase.firestore();
  return db.collection(COLLECTION).doc(userId);
}

async function getStreak(userId) {
  if (!userId) throw Object.assign(new Error('Missing userId'), { status: 400 });
  const ref = await getRef(userId);
  const snap = await ref.get();
  const data = snap.exists ? snap.data() : {};
  return {
    lastDate: data.lastDate || null,
    currentStreak: data.currentStreak || 0,
    longestStreak: data.longestStreak || 0,
    badges: Array.isArray(data.badges) ? data.badges : [],
    updatedAt: data.updatedAt || null
  };
}

async function recordReadingSession(userId, sessionIso) {
  if (!userId) throw Object.assign(new Error('Missing userId'), { status: 400 });
  const dateKey = sessionIso ? toDateKey(new Date(sessionIso)) : toDateKey();
  const ref = await getRef(userId);
  const snap = await ref.get();
  const data = snap.exists ? snap.data() : {};

  const last = data.lastDate || null;
  let current = data.currentStreak || 0;
  let longest = data.longestStreak || 0;
  const badges = Array.isArray(data.badges) ? data.badges.slice() : [];

  if (last === dateKey) {
    // already recorded today means don't record again
  } else if (last === yesterdayKey()) {
    current = (current || 0) + 1;
  } else {
    // missed or first record
    current = 1;
  }

  if (current > longest) {
    longest = current;
    // simple badge logic: unlock at 3,7,30 days will add once achievements are finalized
    const unlocks = [3, 7, 30];
    if (unlocks.includes(current)) {
      const badge = `streak-${current}`;
      if (!badges.includes(badge)) badges.push(badge);
    }
  }

  const payload = {
    lastDate: dateKey,
    currentStreak: current,
    longestStreak: longest,
    badges,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  };

  await ref.set(payload, { merge: true });
  return { userId, ...payload };
}

function fetchMotivation() {
  return new Promise((resolve) => {
    const req = https.get('https://api.quotable.io/random', (res) => {
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => {
        try {
          const j = JSON.parse(body);
          resolve({ text: j.content, author: j.author });
        } catch (e) {
          resolve({ text: 'Keep reading — small steps win.', author: 'CozyClips' });
        }
      });
    });
    req.on('error', () => resolve({ text: 'Keep reading — small steps win.', author: 'CozyClips' }));
    req.end();
  });
}

module.exports = { getStreak, recordReadingSession, fetchMotivation };