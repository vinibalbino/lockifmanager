var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var WemosSchema = new Schema({
  _id: ObjectId,
  token: String,
  macAdress: String,
  IP: { type: String, required: true},
  description: { type: String, required: true}
});

Wemos = mongoose.model("Wevos", WemosSchema);

module.exports = Wemos;
