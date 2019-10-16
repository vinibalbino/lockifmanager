var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  User.find().then(function(users) {
    res.render('users_index', {'users': users});
  });
});
module.exports = router;