const ShopModel = require("../models/ShopModel");

async function listItems(opts) {
  return ShopModel.listItems(opts);
}

async function getItem(itemId) {
  return ShopModel.getItemById(itemId);
}

async function redeemItem(userId, itemId) {
  return ShopModel.redeemItem(userId, itemId);
}

async function getTransactions(userId, opts) {
  return ShopModel.getTransactions(userId, opts);
}

module.exports = {
  listItems,
  getItem,
  redeemItem,
  getTransactions,
};
