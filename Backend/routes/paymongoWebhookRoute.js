const express = require('express');
const router = express.Router();
const handler = require('../services/subscriptionWebhookService');

// PayMongo sends webhooks as raw body for signature verification
router.post('/webhook/paymongo', express.raw({ type: '*/*' }), async (req, res) => {
  try {
    await handler.handlePaymongoWebhook(req.app.locals.db, req);
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('Paymongo webhook error:', err);
    return res.status(err.status || 400).json({ success: false, message: err.message || 'Webhook error' });
  }
});

module.exports = router;