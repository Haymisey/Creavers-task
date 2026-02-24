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
    console.error('Error creating teacher:', err);
    res.status(500).json({ error: err.message });
  }
});

// @route   PUT api/admin/teachers/:id
router.put('/teachers/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Teacher not found' });
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   DELETE api/admin/teachers/:id
router.delete('/teachers/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Teacher removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
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

// @route   PUT api/admin/students/:id
router.put('/students/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'Student not found' });
    user.name = name || user.name;
    user.email = email || user.email;
    if (password) user.password = password;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   DELETE api/admin/students/:id
router.delete('/students/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Student removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
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

// @route   PUT api/admin/subjects/:id
router.put('/subjects/:id', async (req, res) => {
  const { name, description } = req.body;
  try {
    let subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ msg: 'Subject not found' });
    subject.name = name || subject.name;
    subject.description = description || subject.description;
    await subject.save();
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   DELETE api/admin/subjects/:id
router.delete('/subjects/:id', async (req, res) => {
  try {
    await Subject.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Subject removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   GET api/admin/grades
router.get('/grades', async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('students', 'name email')
      .populate('subjectTeachers.subject', 'name')
      .populate('subjectTeachers.teacher', 'name');
    res.json(grades);
  } catch (err) {
    console.error('Error fetching grades:', err);
    res.status(500).json({ error: 'Failed to fetch classes', details: err.message });
  }
});

// @route   POST api/admin/grades
router.post('/grades', async (req, res) => {
  const { name, studentIds, subjectTeachers } = req.body;
  try {
    const newGrade = new Grade({ 
      name, 
      students: studentIds, 
      subjectTeachers: subjectTeachers // Expecting array of { subject: id, teacher: id }
    });
    await newGrade.save();
    res.json(newGrade);
  } catch (err) {
    console.error('Error creating class:', err);
    res.status(500).json({ error: 'Failed to create class', details: err.message });
  }
});

// @route   GET api/admin/grades/:id
router.get('/grades/:id', async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id)
      .populate('students', 'name email')
      .populate('subjectTeachers.subject', 'name')
      .populate('subjectTeachers.teacher', 'name');
    if (!grade) return res.status(404).json({ msg: 'Class not found' });
    res.json(grade);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// @route   PUT api/admin/grades/:id
router.put('/grades/:id', async (req, res) => {
  const { name, studentIds, subjectTeachers } = req.body;
  try {
    let grade = await Grade.findById(req.params.id);
    if (!grade) return res.status(404).json({ msg: 'Class not found' });

    grade.name = name || grade.name;
    grade.students = studentIds || grade.students;
    grade.subjectTeachers = subjectTeachers || grade.subjectTeachers;

    await grade.save();
    res.json(grade);
  } catch (err) {
    console.error('Error updating class:', err);
    res.status(500).json({ error: 'Failed to update class', details: err.message });
  }
});

// @route   DELETE api/admin/grades/:id
router.delete('/grades/:id', async (req, res) => {
  try {
    await Grade.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Class removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
