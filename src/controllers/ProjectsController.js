const Project = require('../models/Project');

module.exports = {
  async getAllProjects(req,res){
    const projects = await Project.find();
    res.render('projects_index', {'projects': projects});
  }
}