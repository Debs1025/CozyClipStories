const studentService = require('../services/studentService');
const userService = require('../services/userService');

async function createProfile(req, res) {
  try {
    const userId = req.params.id || req.body.userId || (req.user && req.user.id);
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    const profile = await studentService.createProfile(userId, req.body || {});
    res.status(201).json({ success: true, message: 'Profile created', data: { profile } });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

async function getProfile(req, res) {
  try {
    const userId = req.params.id || (req.user && req.user.id);
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    const profile = await studentService.getProfile(userId);
    if (!profile) return res.status(404).json({ success: false, message: 'Profile not found' });

    res.status(200).json({ success: true, data: { profile } });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

async function getAllProfiles(req, res) {
  try {
    const profiles = await studentService.getAllProfiles();
    res.status(200).json({ success: true, data: { profiles } });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

function isOwner(reqUser, targetId) {
  return reqUser && String(reqUser.id) === String(targetId);
}


async function updateProfile(req, res) {
  try {
    const userId = req.params.id || (req.user && req.user.id);
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    // Check for ownership
    if (req.user && req.user.role === 'student' && !isOwner(req.user, userId)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    // check for password change request
    if (req.body && req.body.password) {
      const current = req.body.currentPassword;
      const newPass = req.body.password;
      if (!current) return res.status(400).json({ success: false, message: 'Current password required to change password' });
      await userService.changePassword(userId, current, newPass);
      delete req.body.password;
      delete req.body.currentPassword;
    }

    const profile = await studentService.updateProfile(userId, req.body || {});

    res.status(200).json({ success: true, message: 'Profile updated', data: { profile } });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

async function deleteProfile(req, res) {
  try {
    const userId = req.params.id || (req.user && req.user.id);
    if (!userId) return res.status(400).json({ success: false, message: 'Missing userId' });

    // Check for ownership
    if (req.user && req.user.role === 'student' && String(req.user.id) !== String(userId)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await studentService.deleteProfile(userId);
    res.status(200).json({ success: true, message: 'Profile deleted' });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

module.exports = {
  createProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile
};