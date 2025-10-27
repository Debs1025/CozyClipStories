const ShopService = require("../services/ShopService");

const ShopController = {
  async listItems(req, res) {
    try {
      const { page = 1, limit = 20 } = req.query;
      const result = await ShopService.listItems({ page: Number(page), limit: Number(limit) });
      res.json({ success: true, ...result });
    } catch (error) {
      console.error("ShopController.listItems error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async redeem(req, res) {
    try {
      // Accept userId in body or in x-user-id header (useful when auth middleware not present)
      const { itemId } = req.body;
      let userId = req.body.userId || req.headers['x-user-id'];
      if (!userId || !itemId) return res.status(400).json({ success: false, message: "userId and itemId are required" });
      const result = await ShopService.redeemItem(userId, itemId);
      res.json({ success: true, message: "Item redeemed", result });
    } catch (error) {
      // Map common client errors to 400 based on substring match
      const msg = error.message || '';
      const clientErrorKeywords = [
        'Insufficient points',
        'Item already purchased',
        'User not found',
        'Item not found',
      ];
      const isClient = clientErrorKeywords.some((kw) => msg.includes(kw));
      const status = isClient ? 400 : 500;
      res.status(status).json({ success: false, message: msg });
    }
  },

  async getTransactions(req, res) {
    try {
      const { userId } = req.params;
      const { page = 1, limit = 50 } = req.query;
      if (!userId) return res.status(400).json({ success: false, message: "userId is required" });
      const result = await ShopService.getTransactions(userId, { page: Number(page), limit: Number(limit) });
      res.json({ success: true, ...result });
    } catch (error) {
      console.error("ShopController.getTransactions error:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = ShopController;
