const admin = require("firebase-admin");

let firebaseConfig = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    if (firebaseConfig && typeof firebaseConfig.private_key === "string" && firebaseConfig.private_key.includes("\\n")) {
      firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, "\n");
    }
  } else if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
    firebaseConfig = {
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    };
  } else {
    firebaseConfig = null;
  }
} catch (err) {
  console.warn("Failed to load firebase config:", err && err.message);
  firebaseConfig = null;
}

if (!admin.apps.length) {
  if (firebaseConfig) {
    admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) });
  } else {
    console.warn("Firebase not initialized: set FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY in env");
  }
}

const db = admin.firestore();
const shopCollection = db.collection("shop");
const studentsCollection = db.collection("students");

async function redeemItem(userId, itemId) {
  const studentRef = studentsCollection.doc(userId);
  const itemRef = shopCollection.doc(itemId);

  return db.runTransaction(async (tx) => {
    const [studentSnap, itemSnap] = await Promise.all([
      tx.get(studentRef),
      tx.get(itemRef),
    ]);

    if (!studentSnap.exists) throw new Error("Student not found");
    if (!itemSnap.exists) throw new Error("Item not found");

    const student = studentSnap.data();
    const item = itemSnap.data();

    if ((student.inventory || []).some(i => i.id === itemId)) {
      throw new Error("Already owned");
    }
    if ((student.coins || 0) < item.cost) {
      throw new Error("Not enough coins");
    }

    const entry = {
      id: itemId,
      name: item.name || item.title,
      type: "boost",           // REQUIRED
      icon: item.icon || null,
      cost: item.cost,
      durationUses: 1,         // REQUIRED
      remainingUses: 1,        // REQUIRED
      used: false,             // REQUIRED
      redeemedAt: new Date().toISOString(),
    };

    tx.update(studentRef, {
      coins: admin.firestore.FieldValue.increment(-item.cost),
      inventory: admin.firestore.FieldValue.arrayUnion(entry),
    });

    return { success: true, item: entry };
  });
}

module.exports = { redeemItem };