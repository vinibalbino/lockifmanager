const express = require('express');
const router = express.Router();
const PadsController = require('../controllers/PadsController');

router.get('/', PadsController.getHomePads);

module.exports = router;