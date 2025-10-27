const express = require("express");
const router = express.Router();
const ShopController = require("../controllers/ShopController");

// GET /api/shop - list items
router.get("/", ShopController.listItems);

// POST /api/shop/redeem - redeem an item
router.post("/redeem", ShopController.redeem);

// GET /api/shop/transactions/:userId - get user transaction history
router.get("/transactions/:userId", ShopController.getTransactions);

module.exports = router;
