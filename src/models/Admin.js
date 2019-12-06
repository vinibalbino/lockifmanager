const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const AdminSchema = new Schema({
  _id: ObjectId,
  username: String,
  password: String,
});

module.exports = mongoose.model("Admin", AdminSchema);
