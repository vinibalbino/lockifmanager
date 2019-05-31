var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ProjectSchema = require('../models/project');
var User = require('../models/user');

router.get('/add', function(req, res, next) {
  //TODO: Formulário de criação de um usuário
  res.render('users_add');
});

router.get('/:userId', function(req, res, next) {
  //TODO: Visualização do usuário
  var userId = req.params.userId;
  User.find({cpf: userId}).then(function(user) { 
    res.render('user', {'user': user[0]});
  });
});

router.get('/:userId/delete', function(req, res, next) {
  //TODO: Remove usuário
  var userId = req.params.userId;
  User.findOneAndRemove({cpf: userId}, function(callback) {
    res.redirect('/');
  });
});

router.get('/:userId/edit', function(req, res, next) {
  //TODO: Formulário de edição de um usuário
  var userId = req.params.userId;
  User.find({cpf: userId}).then(function(user) { 
    res.render('user_edit', {'user': user[0]});
  });
});

router.post('/add', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um usuário
  console.log(req.body);
  var name_user = req.body.name;
  var cpf_user = req.body.cpf;
  var birth_date = req.body.birth_date;
  //TODO ver como tratar como um vetor pois está como objeto
  // User.find({}, function(err,users){
  //   for(var i=0;i<users.length;i++){
  //     if(users[i].cpf == cpf_user){
  //       console.log('tem que fazer algo');
  //       logica = true;
  //     }
  //   }
  // });
  // if(logica == true){
  //   var user = new User({
  //     name: name_user,
  //     cpf: cpf_user,
  //     birth_date: birth_date,
  //   });
  //   user.save(function(error){
  //       if(error){
  //         res.render(error);
  //       }
  //       res.redirect('/users');
  //   })  
  // }
  // else{
  //   res.send('/');
  // }
});

router.post('/:userId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um usuário
  var userId = req.params.userId;
  User.findOneAndUpdate( {cpf: userId}, req.body).then(function(callback) {
      res.redirect('/users')
  });
});

module.exports = router;
