const admin = require("firebase-admin");

let serviceAccount = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    if (typeof serviceAccount.private_key === "string" && serviceAccount.private_key.includes("\\n")) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
    }
  }
} catch (e) {
  console.warn("Invalid FIREBASE_SERVICE_ACCOUNT_JSON:", e && e.message);
  serviceAccount = null;
}

if (!admin.apps.length && serviceAccount) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
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