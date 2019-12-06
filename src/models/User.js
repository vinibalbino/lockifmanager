const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
  _id: ObjectId,
  name: String,
  cpf: String,
  birth_date: {type: Date, default: Date.now},
  // finger_print: String,
  projects: [{type: ObjectId, ref: 'Project'}],
  active: {type: Boolean, default: true},
  blocked: {type: Boolean, default: false},
});

module.exports = mongoose.model("User", UserSchema);