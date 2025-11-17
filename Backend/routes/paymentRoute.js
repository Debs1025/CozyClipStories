const express = require('express');
const router = express.Router();
const controller = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/studentMiddleware');
const { createValidator } = require('../validators/paymentValidator');

// Subscription routes
router.post('/api/subscription', verifyToken, createValidator, controller.createSubscription);
router.get('/api/subscription/:userId', verifyToken, controller.getSubscription);
router.patch('/api/subscription/:userId', verifyToken, controller.updateSubscription);
router.delete('/api/subscription/:userId', verifyToken, controller.cancelSubscription);

module.exports = router;