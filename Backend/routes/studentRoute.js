const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');
const { createOrUpdateProfile } = require('../validators/studentValidator');
const { verifyToken, requireRole } = require('../middlewares/studentMiddleware');

// Student profile routes
router.get('/api/student/profile', verifyToken, requireRole('student'), controller.getAllProfiles);
router.post('/api/student/profile', verifyToken, requireRole('student'), createOrUpdateProfile, controller.createProfile);
router.get('/api/student/profile/:id', verifyToken, requireRole('student'), controller.getProfile);
router.patch('/api/student/profile/:id', verifyToken, requireRole('student'), createOrUpdateProfile, controller.updateProfile);
router.delete('/api/student/profile/:id', verifyToken, requireRole('student'), controller.deleteProfile);

module.exports = router;