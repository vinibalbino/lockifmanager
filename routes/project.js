var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
var User = require('../models/user');

router.get('/add', function(req, res, next) {
  //TODO: Formulário de criação de um projeto
  Project.find().then(function(projects){
    console.log(projects);
  });
  User.find().then(function(users) {
    res.render('project_add', {user: users});
  });
});

router.get('/:projectId', function(req, res, next) {
  //TODO: Visualização do projeto
  var projectId = req.params.projectId;
    Project.find({_id: projectId}).then(function(project) { 
      User.find({ _id: project[0].users }).then(function(userNames){
        User.find({ _id: project[0].coordinator}).then(function(Coordinator){
          console.log(Coordinator);
          res.render('project', {'project': project[0], 'userNames': userNames, 'coordinator': Coordinator });
        });
        
      });
    });
});

router.get('/:projectId/delete', function(req, res, next) {
  //TODO: Remove o projeto
  var projectId = req.params.projectId   
  Project.findOneAndRemove({_id: projectId}, function(callback) {
    res.redirect('/projects');
  });
});

router.get('/:projectId/edit', function(req, res, next) {
  //TODO: Formulário de edição de um projeto
    var projectId = req.params.projectId;
    Project.find({_id: projectId}).then(function(project) { 
      User.find().then(function(users){
        User.find({ _id: project[0].coordinator}).then(function(Coordinator){
          console.log(Coordinator);
          res.render('project_edit', {'project': project[0], 'Users': users, 'coordinator': Coordinator });
        });
      });
    });
});

router.post('/add/', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um projeto
  var name_project = req.body.name;
  var description_project = req.body.description;
  var coordinator = req.body.coordinator;
  var participants = req.body.participants;
  participants = JSON.parse(participants);
  var project = new Project({
      name: name_project,
      description: description_project,
      users: participants,
      coordinator: coordinator  
    });
  project.save(function(error){
      if(error){
        console.error(error);
      }

      res.redirect('/projects');
  })
});

// var ProjectSchema = new Schema({
//   name: String,
//   description: String,
//   create_date: {type: Date, default: Date.now},
//   users: [{type: ObjectId, ref: 'UserSchema'}],
//   coordinator: {type: ObjectId, ref: 'UserSchema'}
// });

router.post('/:projectId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um projeto
  console.log(req.body);
  var projectId = req.params.projectId;
  var name_project = req.body.name;
  var description_project = req.body.description;
  var coordinator = req.body.coordinator;
  var participants = req.body.participants;
  participants = JSON.parse(participants);
  Project.findOneAndUpdate( {_id: projectId}, {
      name: name_project,
      description: description_project,
      users: participants,
      coordinator: coordinator
    }
      ).then(function(callback) {
        res.redirect('/projects')
    });
});

module.exports = router;
