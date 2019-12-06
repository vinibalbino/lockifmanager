const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/LoginController');
const passport = require('passport');

router.get('/', LoginController.getLoginPage);
router.post('/', passport.authenticate('local', { failureRedirect: '/login' }), LoginController.login)
// router.post('/', LoginController.save);

module.exports = router;
