const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const WemosSchema = new Schema({
  _id: ObjectId,
  token: String,
  macAddress: String,
  IP: { type: String, required: true},
  description: { type: String, required: true},
});

module.exports = mongoose.model("Wemos", WemosSchema);
