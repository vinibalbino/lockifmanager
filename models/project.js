var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var ProjectSchema = new Schema({
  name: String,
  description: String,
  create_date: {type: Date, default: Date.now},
  users: [{type: ObjectId, ref: 'UserSchema'}],
  coordinator: {type: ObjectId, ref: 'UserSchema'}
});

Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
