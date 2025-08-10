const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI; 
    if (!db) {
      throw new Error('MongoDB URI is missing in the environment variables');
    }

    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
