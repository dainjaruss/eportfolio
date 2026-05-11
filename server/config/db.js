const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    // In serverless, we don't want to exit the process, just throw the error
    throw err;
  }
};

module.exports = connectDB;

