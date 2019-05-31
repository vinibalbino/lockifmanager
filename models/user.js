var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


var UserSchema = new Schema({
  name: String,
  cpf: String,
  birth_date: {type: Date, default: Date.now},
  // finger_print: String,
  // photo: String,
  // projects: [{type: ObjectId, ref: 'ProjectSchema'}],
  // groups: [String]
});

User = mongoose.model("User", UserSchema);

module.exports = User;
