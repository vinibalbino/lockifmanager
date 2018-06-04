var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectSchema = require('../models/project');
var UserSchema = require('../models/user');

router.get('/', function(req, res, next) {
  //TODO: Formulário de criação de um projeto
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

router.post('/', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um projeto
});



module.exports = router;
