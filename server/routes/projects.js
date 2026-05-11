const express = require('express');
const router = express.Router();
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const auth = require('../middleware/auth');

router.route('/')
  .get(getProjects)
  .post(auth, createProject);

router.route('/:id')
  .put(auth, updateProject)
  .delete(auth, deleteProject);

module.exports = router;
