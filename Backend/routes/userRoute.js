const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { registerValidator, loginValidator } = require('../validators/userValidator');
const { authLimiter } = require('../middlewares/authLimit');

// User Routes
router.post('/api/user/register', authLimiter, registerValidator, controller.registerUser);
router.post('/api/user/login', authLimiter, loginValidator, controller.loginUser);

module.exports = router;