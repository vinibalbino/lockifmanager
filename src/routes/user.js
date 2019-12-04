const express = require('express')
const UserController = require('../controllers/UserController');
const router = express.Router();

router.get('/add', UserController.getAddForm);
router.get('/:userId', UserController.getUser);
router.get('/:userId/delete', UserController.deleteUser);
router.get('/:userId/edit', UserController.getEditForm);
router.post('/add', UserController.addUser);
router.post('/:userId', UserController.editUser);

module.exports = router;
