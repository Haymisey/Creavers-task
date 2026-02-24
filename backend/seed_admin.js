const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    const adminEmail = 'admin@creavers.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin user already exists.');
      process.exit();
    }

    const admin = new User({
      name: 'System Admin',
      email: adminEmail,
      password: 'password123',
      role: 'Admin'
    });

    await admin.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@creavers.com');
    console.log('Password: password123');
    
    process.exit();
  } catch (err) {
    console.error('Error seeding admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
