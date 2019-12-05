const express = require('express');
const router = express.Router();
const PadController = require('../controllers/PadController')
const simpleAuthMiddle = require('../helpers/simple-auth-middleware');
router.get('/add', PadController.getAddForm);
router.get('/:_idPad', PadController.getPad);
router.get('/:_idPad/wemos',simpleAuthMiddle , PadController.checkWemos);
router.get('/:_idPad/edit', PadController.getEditForm);
router.get('/:_idPad/delete', PadController.deletePad);
router.post('/add', PadController.addPad);
router.post('/:_idPad/edit', PadController.editPad);

module.exports = router;