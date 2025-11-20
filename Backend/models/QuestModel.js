// models/QuestModel.js — FINAL + CHECKS userId EXISTS IN students
const admin = require("firebase-admin");
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

class QuestModel {
  static async updateProgress(userId, eventType) {
    const studentRef = db.collection("students").doc(userId);

    return await db.runTransaction(async (t) => {
      const studentDoc = await t.get(studentRef);

      // CHECK: userId must exist in students table
      if (!studentDoc.exists) {
        console.log(`User ${userId} not found in students collection`);
        return { coinsEarned: 0, error: "User not found" };
      }

      let studentData = studentDoc.data();
      let quests = studentData.quests || [];
      let coinsEarned = 0;

      // Load all quest definitions
      const questsSnap = await t.get(db.collection("quests"));
      const questDefs = {};
      questsSnap.forEach(doc => {
        questDefs[doc.id] = doc.data();
      });

      // Auto-initialize quests if first time
      if (quests.length === 0) {
        quests = Object.keys(questDefs).map(questId => ({
          questId,
          progress: 0,
          completed: false
        }));
      }

      // Process event
      for (const q of quests) {
        if (q.completed) continue;
        const def = questDefs[q.questId];
        if (!def || def.trigger !== eventType) continue;

        q.progress += 1;
        if (q.progress >= def.target) {
          q.completed = true;
          coinsEarned += Number(def.rewardCoins || 0);
        }
      }

      // Save back
      t.set(studentRef, {
        quests,
        coins: FieldValue.increment(coinsEarned),
        totalCoinsEarned: FieldValue.increment(coinsEarned),
        updatedAt: FieldValue.serverTimestamp()
      }, { merge: true });

      return { coinsEarned };
    });
  }
}

module.exports = QuestModel;