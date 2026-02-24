const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Mark = require('../models/Mark');

// All routes here require Student role
router.use(auth);
router.use(authorize(['Student']));

// @route   GET api/student/marks
router.get('/marks', async (req, res) => {
  try {
    const marks = await Mark.find({ student: req.user.id })
      .populate('subject', 'name')
      .populate({
        path: 'grade',
        select: 'name subjectTeachers',
        populate: {
          path: 'subjectTeachers.teacher',
          select: 'name'
        }
      });
    res.json(marks);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
