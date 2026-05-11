const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    unique: true,
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },

  link: {
    type: String,
    default: null
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  
  tools: {
    type:[String],
    required: [true, 'Please add at least one tool used']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },

  image: {
    type: String,
    default: 'default-project.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);

