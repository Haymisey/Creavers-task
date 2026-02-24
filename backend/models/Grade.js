const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "10-A"
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subjectTeachers: [{
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', GradeSchema);
