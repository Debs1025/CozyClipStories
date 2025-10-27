const COLLECTION = 'students';

const studentSchema = {
  studentId: { type: 'string', required: true, unique: true },
  username: { type: 'string', required: true },
  displayName: { type: 'string' },
  grade_level: { type: 'string' },
  avatarUrl: { type: 'string' },
  avatarBase64: { type: 'string' },
  customization: { type: 'object' },
  unlockedItems: { type: 'array' },
  rank: { type: 'string' },
  coins: { type: 'number' },
  diamonds: { type: 'number' },
  points: { type: 'number' },
  badges: { type: 'array' },
  readingProgress: { type: 'array' },
  quizHistory: { type: 'array' },
  achievements: { type: 'array' }
};

module.exports = { COLLECTION, studentSchema };