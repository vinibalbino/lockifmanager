var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PadSchema = new Schema({
  token: {type: String},
  macAdress: {type: String,},
  enable: {type: Boolean, default: false},
  IP: {type: Date, default: Date.now},
  wemos: {type: String, ref: 'Wemos'},
});

Pad = mongoose.model("Pad", PadSchema);

module.exports = Pad;
