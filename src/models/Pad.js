const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PadSchema = new Schema({
  _id: ObjectId,
  name: String,
  macAdress: {type: String,},
  token: { type: String},
  wemos: {type: String, ref: 'Wemos'},
});

module.exports = mongoose.model("Pad", PadSchema);