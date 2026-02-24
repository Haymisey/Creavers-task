const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Grade = require('../models/Grade');

// All routes here require Admin role
router.use(auth);
router.use(authorize(['Admin']));

// @route   GET api/admin/teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'Teacher' }).select('-password');
    res.json(teachers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/teachers
router.post('/teachers', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password, role: 'Teacher' });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/students
router.get('/students', async (req, res) => {
  try {
    const students = await User.find({ role: 'Student' }).select('-password');
    res.json(students);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/students
router.post('/students', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    user = new User({ name, email, password, role: 'Student' });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/subjects
router.get('/subjects', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/subjects
router.post('/subjects', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newSubject = new Subject({ name, description });
    await newSubject.save();
    res.json(newSubject);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/grades
router.get('/grades', async (req, res) => {
  try {
    const grades = await Grade.find().populate('teacher', 'name').populate('students', 'name');
    res.json(grades);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST api/admin/grades
router.post('/grades', async (req, res) => {
  const { name, teacherId, studentIds } = req.body;
  try {
    const newGrade = new Grade({ name, teacher: teacherId, students: studentIds });
    await newGrade.save();
    res.json(newGrade);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/grades/:id
router.put('/grades/:id', async (req, res) => {
  const { name, teacherId, studentIds } = req.body;
  try {
    let grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ msg: 'Grade not found' });

    grade.name = name || grade.name;
    grade.teacher = teacherId || grade.teacher;
    grade.students = studentIds || grade.students;

    await grade.save();
    res.json(grade);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
