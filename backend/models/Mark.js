const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  grade: { type: mongoose.Schema.Types.ObjectId, ref: 'Grade', required: true },
  marks: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mark', MarkSchema);
