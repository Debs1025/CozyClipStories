const COLLECTION = 'teachers';

const teacherSchema = {
   teacherId: { type: 'string', required: true, unique: true },
   name: { type: 'string', required: true },
   subject: { type: 'string', required: true },
   username: { type: 'string', required: true, unique: true },
}

module.exports = { COLLECTION, teacherSchema };