const mongoose = require('mongoose');
require('dotenv').config();
const Grade = require('./models/Grade');
const User = require('./models/User');
const Subject = require('./models/Subject');

async function diagnose() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const grades = await Grade.find()
      .populate('students', 'name')
      .populate('subjectTeachers.subject', 'name')
      .populate('subjectTeachers.teacher', 'name');

    console.log('--- Grades ---');
    grades.forEach(g => {
      console.log(`Class: ${g.name} (${g._id})`);
      console.log(`  Students: ${g.students.length}`);
      console.log(`  Assignments: ${g.subjectTeachers.length}`);
      g.subjectTeachers.forEach(st => {
        console.log(`    Subject: ${st.subject ? st.subject.name : 'NULL'} | Teacher: ${st.teacher ? st.teacher.name : 'NULL'}`);
      });
    });

    const teachers = await User.find({ role: 'Teacher' });
    console.log('\n--- Teachers ---');
    teachers.forEach(t => console.log(`${t.name} (${t._id})`));

    const subjects = await Subject.find();
    console.log('\n--- Subjects ---');
    subjects.forEach(s => console.log(`${s.name} (${s._id})`));

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
}

diagnose();
