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
  console.log('Teacher fetching assigned students. ID:', req.user.id);
  try {
    const grades = await Grade.find({ "subjectTeachers.teacher": req.user.id })
      .populate('students', 'name email')
      .populate('subjectTeachers.subject', 'name');

    // Fetch marks for these grades
    const marks = await Mark.find({ 
      grade: { $in: grades.map(g => g._id) }
    }).lean();

    // Attach marks to students in the grades
    const gradesWithMarks = grades.map(grade => {
      const plainGrade = grade.toObject();
      plainGrade.students = plainGrade.students.map(student => {
        // Find marks for this student in this grade for subjects taught by this teacher
        student.marks = marks.filter(m => 
          m.student.toString() === student._id.toString() && 
          m.grade.toString() === grade._id.toString() &&
          grade.subjectTeachers.some(st => 
            st.teacher.toString() === req.user.id && 
            st.subject._id.toString() === m.subject.toString()
          )
        ).map(m => ({
          subjectId: m.subject,
          subjectName: grade.subjectTeachers.find(st => st.subject._id.toString() === m.subject.toString())?.subject.name,
          score: m.marks
        }));
        return student;
      });
      return plainGrade;
    });

    console.log(`Found ${grades.length} grades for teacher ${req.user.id}`);
    res.json(gradesWithMarks);
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
