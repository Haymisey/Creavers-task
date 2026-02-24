const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Grade 10A"
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Grade', GradeSchema);
