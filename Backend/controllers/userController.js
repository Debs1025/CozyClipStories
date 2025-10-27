const service = require('../services/userService');
const studentService = require('../services/studentService');
const teacherService = require('../services/teacherService');

async function registerUser (req, res) {
  try {
    const { username, email, password, id, role } = req.body;
    const user = await service.registerUser({ username, email, password, id, role });

    const r = String(role || '').toLowerCase();
    if (r === 'student') {
      await studentService.createProfile(user.id, { displayName: username, username });
    } 

    res.status(201).json({ success: true, message: 'User registered successfully', data: { user } });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

async function loginUser (req, res) {
  try {
    const { email, password, role } = req.body;
    const result = await service.authenticateUser(email, password, role);
    res.status(200).json({ success: true, message: 'Login successful', data: result });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ success: false, message: error.message || 'Internal server error' });
  }
}

module.exports = { registerUser, loginUser };