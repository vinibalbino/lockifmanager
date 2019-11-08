const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

var WemosSchema = new Schema({
  _id: ObjectId,
  token: String,
  macAdress: String,
  IP: { type: String, required: true},
  description: { type: String, required: true},
});

Wemos = mongoose.model("Wemos", WemosSchema);

module.exports = Wemos;
