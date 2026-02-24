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
    // 1. Find ALL grades the student belongs to
    const grades = await Grade.find({ students: req.user.id })
      .populate('subjectTeachers.subject', 'name description')
      .populate('subjectTeachers.teacher', 'name');

    console.log(`Found ${grades.length} grades for Student.`);

    if (!grades || grades.length === 0) {
      return res.json([]);
    }

    // 2. Fetch all marks for this student
    const actualMarks = await Mark.find({ student: req.user.id });
    console.log(`Found ${actualMarks.length} actual mark records.`);

    // 3. Map curriculum to included marks from ALL grades
    let fullCurriculum = [];
    
    grades.forEach(grade => {
      const gradeCurriculum = grade.subjectTeachers.map(st => {
        const markEntry = actualMarks.find(m => 
          m.subject.toString() === st.subject._id.toString() &&
          m.grade.toString() === grade._id.toString()
        );
        
        return {
          subject: st.subject,
          teacher: st.teacher,
          grade: { _id: grade._id, name: grade.name },
          marks: markEntry ? markEntry.marks : null,
          _id: markEntry ? markEntry._id : null
        };
      });
      fullCurriculum = fullCurriculum.concat(gradeCurriculum);
    });

    console.log('Sending full curriculum with marks. Count:', fullCurriculum.length);
    res.json(fullCurriculum);
  } catch (err) {
    console.error('Error fetching student marks:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
