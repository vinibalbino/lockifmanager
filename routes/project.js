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
    Project.findOne({_id: projectId}).populate('users').populate('coordinator').then(function(project) { 
      res.render('project', {'project': project, 'userNames': project.users, 'coordinator': project.coordinator });
      // User.find({ _id: project[0].users }).then(function(userNames){
      //   User.find({ _id: project[0].coordinator}).then(function(Coordinator){
      //     console.log(Coordinator);
      //     res.render('project', {'project': project[0], 'userNames': userNames, 'coordinator': Coordinator });
      //   });
      // });
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
    Project.findOne({_id: projectId}).populate('users').populate('coordinator').then(function(project) { 
      var users_id = project.users.map(( {_id} ) => _id);
      User.find().then(function(users){
        console.log(users);
        res.render('project_edit', { 'allUsers': users  ,'project': project, 'Users': project.users, 'coordinator': project.coordinator, 'users_id':  users_id  });
      })
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
  var projectId = req.params.projectId;
  var name_project = req.body.name;
  var description_project = req.body.description;
  var coordinator = req.body.coordinator;
  var participants = req.body.participants;
  participants = JSON.parse(participants);
  // console.log(participants);
  // User.find({ _id: participants   }).then(function(users){
  //   users.forEach(function(user){
  //     user.projects += projectId;

  //     User.findOneAndUpdate({ _id: user._id }, {
  //       project: projectId,
  //     }
  //       ).then(function(callback) {
  //         console.log(users);
  //         res.redirect('/projects');
  //       });
  //   });
  // });
  // User.find({ _id: participants   }).then(function(users){
  // });
  Project.findOneAndUpdate( { _id: projectId }, {
      name: name_project,
      description: description_project,
      users: participants,
      coordinator: coordinator
    }
      ).then(function(callback) {
        console.log(callback);
        res.redirect('/projects')
    });
});

module.exports = router;
