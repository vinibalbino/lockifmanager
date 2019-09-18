var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;


var UserSchema = new Schema({
  _id: ObjectId,
  name: String,
  cpf: String,
  birth_date: {type: Date, default: Date.now},
  // finger_print: String,
  projects: [{type: ObjectId, ref: 'Project'}],
  active: {type: Boolean, default: true},
  blocked: {type: Boolean, default: false},
});

User = mongoose.model("User", UserSchema);

module.exports = User;
