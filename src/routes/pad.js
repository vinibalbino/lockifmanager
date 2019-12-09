const express = require('express');
const router = express.Router();
const PadController = require('../controllers/PadController')
const simpleAuthMiddle = require('../helpers/simple-auth-middleware');
const {authenticationMiddleware} = require('../helpers/auth-middleware');

router.get('/:_idPad', authenticationMiddleware(), PadController.getPad);
router.get('/:_idPad/wemos',simpleAuthMiddle , PadController.checkWemos);
router.get('/:_idPad/edit', authenticationMiddleware(), PadController.getEditForm);
router.get('/:_idPad/delete', authenticationMiddleware(), PadController.deletePad);
router.post('/add', PadController.addPad);
router.post('/:_idPad/edit', authenticationMiddleware(), PadController.editPad);

module.exports = router;