const Project = require('../models/Project');
// const User = require('../models/User');
const mongoose = require('mongoose');
  
module.exports = {
  async getAddForm(req,res){
    const users = await User.find()
    res.render('project_add', { user: users });
  },

  async getProject(req, res) {
    const {projectId} = req.params;
    const project = await Project.findOne({ _id : projectId}).populate('users').populate('coordinator');
    res.render('project', {'project': project, 'userNames': project.users, 'coordinator': project.coordinator });
  },

  async deleteProject(req, res){
    const {projectId} = req.params;
    const project = await Project.findOne( {_id: projectId}).populate('users');
    let usersId = project.users.map( ({ _id }) => _id  );
    usersId.forEach( async (userId) =>{
        await User.findOneAndUpdate( { _id: userId }, {$pull: { project: project._id }});
    });
    await Project.findOneAndRemove( { _id: projectId });
    res.redirect('/projects');
  },

  async getEditForm(req, res){
    const {projectId} = req.params;
    const project = await Project.findOne( { _id: projectId }).populate('users').populate('coordinator');
    let users_id = project.users.map( ({_id}) => _id );
    let users = await User.find();
    res.render('project_edit', { 'allUsers': users  ,'project': project, 'Users': project.users, 'coordinator': project.coordinator, 'users_id':  users_id  });
  },

  async addProject(req,res){
    const { name, description, coordinator  } = req.body;
    let {participants} = req.body;
    participants = JSON.parse(participants);
    let ObjectId = mongoose.Types.ObjectId();
    
    let project = new Project({
      _id: ObjectId,
      name: name,
      description: description,
      users: participants,
      coordinator: coordinator,
    });
    project.save(function(error){
      if(error){
        console.error(error);
      }
    });
    await User.findOneAndUpdate( { _id: project.coordinator._id }, {$push: { projects: project._id } } );
    const user = await User.find( { _id: project.users});
    for(let i=0; i < user.length; i++){
      await User.findOneAndUpdate( { _id: user[i]._id }, {$push: { projects: project._id, } } );
    }
    res.redirect('/projects');
  },
  
  async editProject(req, res){
    const { projectId, name, description, coordinator, participants } = req.body;
    participants = JSON.parse(participants);
    let project = await Project.findOne( { _id: projectId } ).populate('users');
    let usersId = project.users.map( ( {_id} ) => _id);
    await User.findOneAndUpdate( { _id: project.coordinator._id }, {$pull : { projects: project._id }});
    usersId.forEach( async (userId) => {
      await User.findOneAndUpdate( {_id: userId}, {$pull: { projects: project._id } } );
    });
    await Project.findOneAndUpdate( {_id: projectId}, {
      name: name,
      description: description,
      users: participants,
      coordinator: coordinator
    });
    let project = await Project.findOne( {_id: projectId} ).populate('users');
    let usersId = project.users.map(( {_id} ) => _id);
    usersId.forEach( async (userId) => {
      await User.findOneAndUpdate( { _id: userId }, {$push: {projects: project._id} })
    });
    await User.findOneAndUpdate( { _id: project.coordinator._id  }, { $push: { projects: project._id, } });
    res.redirect('/projects');
  },
}