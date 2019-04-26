var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectSchema = require('../models/project');
var UserSchema = require('../models/user');

router.get('/add', function(req, res, next) {
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

router.post('/add', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um usuário
  console.log(req.body);
  /*var name_user = req.body.name;
  var cpf_user = req.body.cpf;
  var birth_date = req.body.birth_date;
  var user = new User({
    name: name_user,
    cpf: cpf_user,
    birth_date: birth_date,
  });
  project.save(function(error){
      if(error){
        console.error(error);
      }

      res.redirect('/users');
  })
  */res.render('users_add_confirm')
});

module.exports = router;
