const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const MONGO_URI = 'mongodb://mongo:27017/todo';
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected Successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;