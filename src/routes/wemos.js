const express = require('express');
const router = express.Router();
const WemosController = require('../controllers/WemosController');

router.get('/', WemosController.getWemos );
router.get('/add', WemosController.getAddForm);
router.get('/:_idWemos', WemosController.getOneWemos);
router.get('/:_idWemos/edit', WemosController.getEditForm);
router.get('/:_idWemos/delete', WemosController.deleteWemos);
router.post('/add', WemosController.addWemos);
router.post('/:_idWemos/edit', WemosController.editWemos);

module.exports = router;