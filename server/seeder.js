const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();

// Load models
const Project = require('./models/Project');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const projects = JSON.parse(
  fs.readFileSync(`${__dirname}/data/projects.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    await Project.create(projects);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error with data import:', err.message);
    process.exit(1);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Project.deleteMany();
    console.log('Data Destroyed Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error with data destruction:', err.message);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
    console.log('Please use -i to import or -d to delete data');
    process.exit();
}
