var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  Project.find().then(function(projects) {
    res.render('projects_index', {'projects': projects});
  });
});
module.exports = router;
