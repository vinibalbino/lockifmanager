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
});

router.delete('/:projectId', function(req, res, next) {
  //TODO: Remove o projeto
});

router.get('/:projectId/edit', function(req, res, next) {
  //TODO: Formulário de edição de um projeto
});

router.put('/:projectId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um projeto
});

router.post('/add', function(req, res, next) {
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

module.exports = router;
