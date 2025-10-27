const firebase = require('firebase-admin');
const { COLLECTION } = require('../models/studentModel');

// Show available customization items
const AVAILABLE_CUSTOM_ITEMS = ['hat_basic','hat_star','bg_forest','bg_space'];

async function createProfile(userId, data = {}) {
  const db = firebase.firestore();
  const ref = db.collection(COLLECTION).doc(userId);
  const payload = {
    studentId: userId,
    username: data.username || '',
    displayName: data.displayName || '',
    rank: data.rank || null,
    coins: Number(data.coins || 0),
    diamonds: Number(data.diamonds || 0),
    points: Number(data.points || 0),
    badges: data.badges || [],
    readingProgress: data.readingProgress || [],
    quizHistory: data.quizHistory || [],
    achievements: data.achievements || [],
    customization: data.customization || {},
    avatarUrl: data.avatarUrl || '',
    unlockedItems: Array.isArray(data.unlockedItems) ? data.unlockedItems : []
  };
  await ref.set(payload, { merge: true });
  const snap = await ref.get();
  return snap.exists ? snap.data() : null;
}

async function getProfile(userId) {
  if (!userId) return null;
  const db = firebase.firestore();
  const snap = await db.collection(COLLECTION).doc(userId).get();
  if (!snap.exists) return null;
  const profile = snap.data();

  const unlocked = Array.isArray(profile.unlockedItems) ? profile.unlockedItems : [];
  const unlockedSet = new Set(unlocked);
  const itemsStatus = {
    unlocked: AVAILABLE_CUSTOM_ITEMS.filter(i => unlockedSet.has(i)),
    locked: AVAILABLE_CUSTOM_ITEMS.filter(i => !unlockedSet.has(i))
  };

  return { ...profile, itemsStatus };
}

async function getAllProfiles() {
  const db = firebase.firestore();
  const snap = await db.collection(COLLECTION).get();
  return snap.docs.map(d => d.data());
}

async function updateProfile(userId, data = {}) {
  if (!userId) throw new Error('Missing userId');
  const db = firebase.firestore();
  const ref = db.collection(COLLECTION).doc(userId);
  await ref.set(data, { merge: true }); 
  const snap = await ref.get();
  return snap.exists ? snap.data() : null;
}

async function deleteProfile(userId) {
  if (!userId) throw new Error('Missing userId');
  const db = firebase.firestore();
  await db.collection(COLLECTION).doc(userId).delete();
  return true;
}

module.exports = { createProfile, getProfile, getAllProfiles, updateProfile, deleteProfile };
