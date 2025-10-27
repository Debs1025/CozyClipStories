const { body, validationResult } = require('express-validator');

const MAX_AVATAR_BYTES = 1 * 1024 * 1024; // 1MB
const DATA_URI_RE = /^data:(image\/(png|jpeg|jpg|webp));base64,([A-Za-z0-9+/=]+)$/i;

const createOrUpdateProfile = [
  body('displayName').optional().isString().trim().notEmpty(),
  body('grade_level').optional().isString().trim(),
  body('classes').optional().isArray(),
  body('classes.*').optional().isString().trim(),
  body('booksRead').optional().isArray(),
  body('booksRead.*').optional().isString().trim(),
  body('avatarUrl').optional().isURL().withMessage('avatarUrl must be a valid URL'),
  body('avatarBase64').optional().custom(value => {
    if (typeof value !== 'string') throw new Error('avatarBase64 must be a string');
    const m = value.match(DATA_URI_RE);
    if (!m) throw new Error('avatarBase64 must be a valid data type (image/png|jpeg|jpg|webp)');
    const b64 = m[3];
    const approxBytes = Math.ceil(b64.length * 3 / 4);
    if (approxBytes > MAX_AVATAR_BYTES) throw new Error('avatar image too large (max 1MB)');
    return true;
  }),
  body('customization').optional().isObject(),
  body('unlockedItems').optional().isArray(),
  body('unlockedItems.*').optional().isString().trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    next();
  }
];

module.exports = { createOrUpdateProfile };