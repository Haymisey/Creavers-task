const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Mark = require('../models/Mark');

// All routes here require Student role
router.use(auth);
router.use(authorize(['Student']));

const Grade = require('../models/Grade');

// @route   GET api/student/marks
router.get('/marks', async (req, res) => {
  console.log('Student fetching marks. Student ID:', req.user.id);
  try {
    // 1. Find the grade the student belongs to
    const grade = await Grade.findOne({ students: req.user.id })
      .populate('subjectTeachers.subject', 'name description')
      .populate('subjectTeachers.teacher', 'name');

    console.log('Found Grade for Student:', grade ? grade.name : 'NONE');

    if (!grade) {
      return res.json([]);
    }

    // 2. Fetch all marks for this student
    const actualMarks = await Mark.find({ student: req.user.id });
    console.log(`Found ${actualMarks.length} actual mark records.`);

    // 3. Map curriculum to included marks
    const curriculumWithMarks = grade.subjectTeachers.map(st => {
      const markEntry = actualMarks.find(m => 
        m.subject.toString() === st.subject._id.toString()
      );
      
      return {
        subject: st.subject,
        teacher: st.teacher,
        grade: { _id: grade._id, name: grade.name },
        marks: markEntry ? markEntry.marks : null,
        _id: markEntry ? markEntry._id : null
      };
    });

    console.log('Sending curriculum with marks. Count:', curriculumWithMarks.length);
    res.json(curriculumWithMarks);
  } catch (err) {
    console.error('Error fetching student marks:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
