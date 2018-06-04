var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectSchema = require('../models/project');
var UserSchema = require('../models/user');

router.get('/', function(req, res, next) {
  var User = mongoose.model('User', UserSchema);
  User.find().then(function(users) {
    res.render('users_index', {'users': users});
  });
});
module.exports = router;
