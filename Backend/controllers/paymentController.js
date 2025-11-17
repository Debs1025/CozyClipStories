const paymentService = require('../services/paymentService');
const { validationResult } = require('express-validator');

// create subscription 
async function createSubscription(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });

    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });

    const { plan, name, email, paymongoPlanId } = req.body || {};
    if (!plan) return res.status(400).json({ success: false, message: 'Missing plan' });

    const data = await paymentService.createSubscription(userId, { plan, name, email, paymongoPlanId });
    return res.status(201).json({ success: true, data });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message || 'Internal server error' });
  }
}

// get subscription for a user 
async function getSubscription(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });
    if (!req.user || req.user.id !== userId) return res.status(403).json({ success: false, message: 'Forbidden' });

    const data = await paymentService.getSubscription(userId);
    if (!data) return res.status(404).json({ success: false, message: 'Subscription not found' });
    return res.status(200).json({ success: true, data });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message || 'Internal server error' });
  }
}

// update / renew subscription
async function updateSubscription(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });
    if (!req.user || req.user.id !== userId) return res.status(403).json({ success: false, message: 'Forbidden' });

    const patch = req.body || {};
    const data = await paymentService.updateSubscription(userId, patch);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message || 'Internal server error' });
  }
}

// cancel subscription
async function cancelSubscription(req, res) {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });
    if (!req.user || req.user.id !== userId) return res.status(403).json({ success: false, message: 'Forbidden' });

    const data = await paymentService.cancelSubscription(userId);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message || 'Internal server error' });
  }
}

async function requirePremium(req, res, next) {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(401).json({ success: false, message: 'Unauthorized' });
    const sub = await paymentService.getSubscription(userId);
    if (!sub || sub.plan !== 'Premium' || sub.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Premium plan required' });
    }
    req.subscription = sub;
    next();
  } catch (err) {
    const status = err.status || 500;
    return res.status(status).json({ success: false, message: err.message || 'Internal server error' });
  }
}

module.exports = {
  createSubscription,
  getSubscription,
  updateSubscription,
  cancelSubscription,
  requirePremium
};