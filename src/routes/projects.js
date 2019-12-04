const express = require('express');
const router = express.Router();
const ProjectsController = require('../controllers/ProjectsController');

router.get('/', ProjectsController.getAllProjects);

module.exports = router;