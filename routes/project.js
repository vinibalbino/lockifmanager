var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/project');
var User = require('../models/user');

router.get('/add', function(req, res, next) {
  //TODO: Formulário de criação de um projeto
  User.find().then(function(users) {
    res.render('project_add', {user: users});
  });
});

router.get('/:projectId', function(req, res, next) {
  //TODO: Visualização do projeto
  var projectId = req.params.projectId;
    Project.findOne({_id: projectId}).populate('users').populate('coordinator').then(function(project) { 
      console.log(project);
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
  var projectId = req.params.projectId;
  Project.findOne( { _id: projectId }).populate('users').then(function(project){
      console.log(project);
      var usersId = project.users.map(( {_id} ) => _id);
      usersId.forEach(userId => {
        User.findOneAndUpdate( { _id: userId }, {$pull: { projects: project._id  } }).then(function(callback){
          console.log(callback);
        })
      });
    })    
  Project.findOneAndRemove({ _id: projectId}, function(callback) {
     res.redirect('/projects');
   })
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

// User.find({ _id: participants }).then(function(user){
//   User.findOneAndUpdate( { _id: user._id }, {
//     project: ,
//   }
//     ).then(function(callback) {
//       console.log(callback);
//       res.redirect('/projects')
//   });
// });


router.post('/add/', function(req, res, next) {
  //TODO: Tratamento do formulário de criação de um projeto
  var name_project = req.body.name;
  var description_project = req.body.description;
  var coordinator = req.body.coordinator;
  var participants = req.body.participants;
  participants = JSON.parse(participants);
  var ObjectId = mongoose.Types.ObjectId();

  var project = new Project({
      _id: ObjectId,
      name: name_project,
      description: description_project,
      users: participants,
      coordinator: coordinator  
    });
  project.save(function(error){
      if(error){
        console.error(error);
      }
  });
  User.findOneAndUpdate( { _id: project.coordinator._id }, {$push: {
    projects: project._id,}
  }).then(function(callback){
    User.find({ _id: project.users}).then(function(user){
      for(let i=0;i<user.length;i++){
          User.findOneAndUpdate( { _id: user[i]._id }, {$push: {
            projects: project._id,}
          }).then(function(callback){
            res.redirect('/projects');
        });
      }
    });
  });
});

router.post('/:projectId', function(req, res, next) {
  //TODO: Tratamento do formulário de edição de um projeto
  var projectId = req.params.projectId;
  var name_project = req.body.name;
  var description_project = req.body.description;
  var coordinator = req.body.coordinator;
  var participants = req.body.participants;
  participants = JSON.parse(participants);
  Project.findOne( { _id: projectId }).populate('users').then(function(project){
    var usersId = project.users.map(( {_id} ) => _id);
    User.findOneAndUpdate( { _id: project.coordinator._id}, {$pull: {
      projects: project._id, }
    }).then(function(callback){
        usersId.forEach(userId => {
          User.findOneAndUpdate( { _id: userId }, {$pull: { projects: project._id  } }).then(function(callback){
              console.log(callback);
          });
        });
      });
    });
  Project.findOneAndUpdate({ _id: projectId},{
    name: "",
    description: "",
    users: [],
  }
    ).then(function(callback){
      Project.findOneAndUpdate( { _id: projectId }, {
        name: name_project,
        description: description_project,
        users: participants,
        coordinator: coordinator
      }
        ).then(function(callback) {
          Project.findOne( { _id: projectId } ).populate('users').then(function(project){
            var usersId = project.users.map(( {_id} ) => _id);
            usersId.forEach( userId => {
              User.findOneAndUpdate( { _id: userId }, {$push: { 
                projects: project._id  } 
              }
                ).then(function(callback){
                  User.findOneAndUpdate( { _id: project.coordinator._id  }, {$push: {
                    projects: project._id, }
                  }).then(function(callback){
                    res.redirect('/projects');
                  });
                });
            });
          });
          });
  });
  
 
});

module.exports = router;
