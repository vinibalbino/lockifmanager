var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
var UserSchema = require('../models/user');

router.get('/add', function(req, res, next) {
  //TODO: Formulário de criação de um projeto
  res.render('project_add');
});

router.get('/:projectId', function(req, res, next) {
  //TODO: Visualização do projeto
  var projectId = req.params.projectId;
  Project.find({_id: projectId}).then(function(project) { 
    res.render('project', {'project': project[0]});
  });
});

router.get('/:projectId/delete', function(req, res, next) {
  //TODO: Remove o projeto
  var projectId = req.params.projectId
  Project.findOneAndRemove({_id: projectId}, function(callback) {
    res.redirect('/');
  });
});

router.get('/:projectId/edit', function(req, res, next) {
  //TODO: Formulário de edição de um projeto
    var projectId = req.params.projectId;
    Project.find({_id: projectId}).then(function(project) { 
      res.render('project_edit', {'project': project[0]});
    });
});

router.post('/add/', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um projeto
  var name_project = req.body.name;
  var description_project = req.body.description;
  console.log(req.body);
  var project = new Project({
    name: name_project,
    description: description_project
  });
  project.save(function(error){
      if(error){
        console.error(error);
      }

      res.redirect('/projects');
  })
});

router.post('/:projectId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um projeto
  var projectId = req.params.projectId;
    Project.findOneAndUpdate( {_id: projectId}, req.body).then(function(callback) {
        res.redirect('/projects')
    });
});

module.exports = router;
