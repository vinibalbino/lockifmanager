const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
/* Route for the home page. */

router.get('/', IndexController.getHomePage);

module.exports = router;
