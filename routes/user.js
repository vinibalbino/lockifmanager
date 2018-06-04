var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectSchema = require('../models/project');
var UserSchema = require('../models/user');

router.get('/', function(req, res, next) {
  //TODO: Formulário de criação de um usuário
  res.render('users_add');
});

router.get('/:userId', function(req, res, next) {
  //TODO: Visualização do usuário
});

router.delete('/:userId', function(req, res, next) {
  //TODO: Remove usuário
});

router.put('/:userId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um usuário
});

router.get('/:userId/edit', function(req, res, next) {
  //TODO: Formulário de edição de um usuário
});

router.post('/', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um usuário
  
  res.render('users_add_confirm');
});

module.exports = router;
