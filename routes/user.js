var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectSchema = require('../models/project');
var User = require('../models/user');

router.get('/add', function(req, res, next) {
  //TODO: Formulário de criação de um usuário
  res.render('users_add', {error: null});
});

router.get('/:userId', function(req, res, next) {
  //TODO: Visualização do usuário
  var userId = req.params.userId;
  User.findOne( {cpf: userId} ).populate('projects').then(function(user) { 
    console.log(user);
    res.render('user', {'user': user,'error': false });
  });
});

router.get('/:userId/delete', function(req, res, next) {
  //TODO: Remove usuário
  var userId = req.params.userId;
  console.log(userId)
  User.findOne( { cpf: userId} ).populate('projects').then(function(user){
    if((user.projects).length != 0 ){
      res.render('user', {'user': user,'error': true });
    }else{
      User.findOneAndRemove({cpf: userId}, function(callback) {
        res.redirect('/users');
      })
    }
  });
});

router.get('/:userId/edit', function(req, res, next) {
  //TODO: Formulário de edição de um usuário
  var userId = req.params.userId;
  User.findOne({cpf: userId}).then(function(user) { 
    res.render('user_edit', {'user': user });
  });
});

router.post('/add', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um usuário
  console.log(req.body);
  var name_user = req.body.name;
  var cpf_user = req.body.cpf;
  var birth_date = req.body.birth_date;
  var ObjectId = mongoose.Types.ObjectId();
  let cpfLength = cpf_user.length;

  User.find({cpf: cpf_user}).then(function(users) { 
    if(users.length == 0 && cpfLength == 11 ) {
      var user = new User({
        _id: ObjectId,
        name: name_user,
        cpf: cpf_user,
        birth_date: birth_date,
      });
      user.save(function(error){
          if(error){
            res.render('error', {error: error});
          }
          res.redirect('/users');
      });        
    }
    else if(users.length != 0) {
      res.render('users_add', {error: 'CPF já cadastrado'});
    }else {
      res.render('users_add', {error: 'CPF inválido '})
    }
  });
});

router.post('/:userId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um usuário
  var userId = req.params.userId;
  User.findOneAndUpdate( {cpf: userId}, req.body).then(function(callback) {
      res.redirect('/users')
  });
});

module.exports = router;
