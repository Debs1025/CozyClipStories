// services/QuestService.js
const QuestModel = require("../models/QuestModel");

class QuestService {
  static async getAllQuests() { return await QuestModel.getAllQuests(); }
  static async getUserQuestProgress(userId) { return await QuestModel.getUserQuestProgress(userId); }
  static async updateUserQuestProgress(userId, eventType, value = 1) {
    return await QuestModel.updateUserQuestProgress(userId, eventType, value);
  }
  static async getStudentCoinBalance(userId) {
    const snap = await admin.firestore().collection("students").where("studentId", "==", userId).limit(1).get();
    if (snap.empty) return 0;
    return snap.docs[0].data().coins || 0;
  }
}

module.exports = QuestService;