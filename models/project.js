var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var ProjectSchema = new Schema({
  _id: ObjectId,
  name: String,
  description: String,
  create_date: {type: Date, default: Date.now},
  users: [{type: ObjectId, ref: 'User'}],
  coordinator: {type: ObjectId, ref: 'User'}
});

Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
