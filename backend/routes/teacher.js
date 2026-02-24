const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Mark = require('../models/Mark');
const Grade = require('../models/Grade');

// All routes here require Teacher role
router.use(auth);
router.use(authorize(['Teacher']));

// @route   GET api/teacher/assigned-students
router.get('/assigned-students', async (req, res) => {
  try {
    const grades = await Grade.find({ "subjectTeachers.teacher": req.user.id })
      .populate('students', 'name email')
      .populate('subjectTeachers.subject', 'name');
    res.json(grades);
  } catch (err) {
    console.error('Error fetching assigned students:', err);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/teacher/marks
router.post('/marks', async (req, res) => {
  const { studentId, subjectId, gradeId, marks } = req.body;
  try {
    // Check if marks already exist for this student/subject/grade
    let mark = await Mark.findOne({ student: studentId, subject: subjectId, grade: gradeId });
    if (mark) {
      mark.marks = marks;
    } else {
      mark = new Mark({ student: studentId, subject: subjectId, grade: gradeId, marks });
    }
    await mark.save();
    res.json(mark);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/teacher/marks/:gradeId
router.get('/marks/:gradeId', async (req, res) => {
  try {
    const marks = await Mark.find({ grade: req.params.gradeId }).populate('student', 'name').populate('subject', 'name');
    res.json(marks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
