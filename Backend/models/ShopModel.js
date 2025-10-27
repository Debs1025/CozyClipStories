const admin = require("firebase-admin");

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const serviceAccount = require("../firebaseConfig.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const shopItemsCollection = db.collection("shopItems");
const usersCollection = db.collection("users");
const transactionsCollection = db.collection("shopTransactions");

/**
 * List available shop items with pagination
 */
async function listItems({ page = 1, limit = 20 } = {}) {
  try {
    const snapshot = await shopItemsCollection.offset((page - 1) * limit).limit(limit).get();
    const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    return { items, page, limit, totalFetched: items.length };
  } catch (error) {
    console.error("Error listing shop items:", error);
    throw new Error(`Failed to list shop items: ${error.message}`);
  }
}

/**
 * Get single shop item by id
 */
async function getItemById(itemId) {
  try {
    if (!itemId) throw new Error("Item ID is required");
    const doc = await shopItemsCollection.doc(itemId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error getting shop item:", error);
    throw new Error(`Failed to get item: ${error.message}`);
  }
}

/**
 * Redeem an item for a user. This runs inside a Firestore transaction to ensure
 * points deduction and inventory update are atomic.
 * Returns transaction record on success.
 */
async function redeemItem(userId, itemId) {
  if (!userId || !itemId) throw new Error("userId and itemId are required");

  try {
    // Resolve user doc: try direct doc id first, then common identifying fields
    let resolvedUserRef = usersCollection.doc(userId);
    let resolvedUserId = userId;

    const directSnap = await resolvedUserRef.get();
    if (!directSnap.exists) {
      // try common fields: uid, email, userId
      const lookups = [
        ['uid', userId],
        ['email', userId],
        ['userId', userId],
      ];

      for (const [field, value] of lookups) {
        try {
          const q = await usersCollection.where(field, '==', value).limit(1).get();
          if (!q.empty) {
            resolvedUserRef = q.docs[0].ref;
            resolvedUserId = q.docs[0].id;
            break;
          }
        } catch (qerr) {
          // ignore and continue
          console.warn('User lookup query error for', field, qerr.message);
        }
      }
    }

    const result = await db.runTransaction(async (t) => {
      const userRef = resolvedUserRef;
      const itemRef = shopItemsCollection.doc(itemId);

      const [userSnap, itemSnap] = await Promise.all([t.get(userRef), t.get(itemRef)]);

      if (!userSnap.exists) throw new Error(`User not found (attempted doc id: ${resolvedUserId})`);
      if (!itemSnap.exists) throw new Error(`Item not found (itemId: ${itemId})`);

      const user = userSnap.data();
      const item = itemSnap.data();

      const userPoints = user.points || 0;
      const inventory = user.inventory || [];

      // Prevent duplicate purchases
      if (inventory.includes(itemId)) {
        throw new Error("Item already purchased by user");
      }

      // Validate sufficient points
      if (userPoints < (item.cost || 0)) {
        throw new Error("Insufficient points");
      }

      // Deduct points and add to inventory
      t.update(userRef, {
        points: admin.firestore.FieldValue.increment(-(item.cost || 0)),
        inventory: admin.firestore.FieldValue.arrayUnion(itemId),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Create transaction log
      const txRef = transactionsCollection.doc();
      const tx = {
        userId: resolvedUserId,
        itemId,
        cost: item.cost || 0,
        itemSnapshot: item,
        status: "completed",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      };
      t.set(txRef, tx);

      return { transactionId: txRef.id, ...tx };
    });

    return result;
  } catch (error) {
    // Attempt to log failed transaction outside the transaction so we have a record
    try {
      await transactionsCollection.add({
        userId,
        itemId,
        cost: null,
        status: "failed",
        reason: error.message,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } catch (logErr) {
      console.error("Failed to write failed transaction log:", logErr);
    }

    console.error("Redeem failed:", error.message);
    throw new Error(error.message);
  }
}

/**
 * Get transaction history for a user
 */
async function getTransactions(userId, { page = 1, limit = 50 } = {}) {
  try {
    // Modified version (no index needed)
    let query = transactionsCollection.where("userId", "==", userId);
    const snapshot = await query.offset((page - 1) * limit).limit(limit).get();
    const transactions = snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => {
        const dateA = a.createdAt?.toMillis() || 0;
        const dateB = b.createdAt?.toMillis() || 0;
        return dateB - dateA;  // newest first
      });
    return { transactions, page, limit, totalFetched: transactions.length };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error(`Failed to fetch transactions: ${error.message}`);
  }
}

module.exports = {
  listItems,
  getItemById,
  redeemItem,
  getTransactions,
};
