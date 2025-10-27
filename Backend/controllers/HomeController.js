// controllers/HomeController.js
const HomeService = require("../services/HomeService");

const HomeController = {
  async saveProgress(req, res) {
    try {
      const result = await HomeService.saveProgress(req.body);
      res.json({ success: true, message: "Progress saved", result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getProgress(req, res) {
    try {
      const { userId, storyId } = req.params;
      const result = await HomeService.getProgress(userId, storyId);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getAllUserProgress(req, res) {
    try {
      const { userId } = req.params;
      const result = await HomeService.getAllUserProgress(userId);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateSession(req, res) {
    try {
      const { userId, storyId, sessionDuration } = req.body;
      const result = await HomeService.updateSessionDuration(userId, storyId, sessionDuration);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async markCompleted(req, res) {
    try {
      const { userId, storyId, totalReadingTime } = req.body;
      const result = await HomeService.markStoryCompleted(userId, storyId, totalReadingTime);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async resetProgress(req, res) {
    try {
      const { userId, storyId } = req.params;
      const result = await HomeService.resetProgress(userId, storyId);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getStats(req, res) {
    try {
      const { userId } = req.params;
      const result = await HomeService.getReadingStats(userId);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getRecentStories(req, res) {
    try {
      const { userId } = req.params;
      const result = await HomeService.getRecentStories(userId);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getCompletedStories(req, res) {
    try {
      const { userId } = req.params;
      const result = await HomeService.getCompletedStories(userId);
      res.json({ success: true, result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getUser(userId) {
    try {
      const userDoc = await usersCollection.doc(userId).get();
      if (!userDoc.exists) {
        throw new Error(`User not found: ${userId}`);
      }
      return { id: userDoc.id, ...userDoc.data() };
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  },

  async saveReadingProgress(progressData) {
    try {
      const { userId, storyId } = progressData;
      // Verify user exists first
      await this.getUser(userId);
      
      // ... rest of the function stays the same
    } catch (error) {
      console.error("Error saving reading progress:", error);
      throw error;
    }
  },

  async getReadingProgress(userId, storyId) {
    try {
      // Verify user exists first
      const user = await this.getUser(userId);
      
      const progressId = `${userId}_${storyId}`;
      const doc = await progressCollection.doc(progressId).get();
      if (!doc.exists) return null;
      return { 
        id: progressId,
        ...doc.data(),
        user: {
          id: user.id,
          username: user.username,
        }
      };
    } catch (error) {
      console.error("Error getting reading progress:", error);
      throw error;
    }
  }
};

module.exports = HomeController;
