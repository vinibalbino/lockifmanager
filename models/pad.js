const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;


const PadSchema = new Schema({
  name: String,
  _id: ObjectId,
  macAdress: {type: String,},
  token: { type: String},
  wemos: {type: String, ref: 'Wemos'},
});

Pad = mongoose.model("Pad", PadSchema);

module.exports = Pad;