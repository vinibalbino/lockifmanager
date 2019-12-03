const express = require('express');
const router = express.Router();
const ProjectController = require('../controllers/ProjectController');

router.get('/add', ProjectController.getAddForm);
router.get('/:projectId', ProjectController.getProject);
router.get('/:projectId/delete', ProjectController.deleteProject);
router.get('/:projectId/edit', ProjectController.getEditForm);
router.post('/add/', ProjectController.addProject);
router.post('/:projectId', ProjectController.editProject);

module.exports = router;