var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PadSchema = new Schema({
  token: ObjectId,
  macAdress: String,
  enable: String,
  IP: {type: Date, default: Date.now},
  wemos: {type: String, ref: 'Wemos'},
});

Pad = mongoose.model("Pad", PadSchema);

module.exports = Pad;
