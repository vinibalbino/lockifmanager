var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var WemosSchema = new Schema({
  token: String,
  macAdress: String,
  enable: {type: Boolean, default: true},
  IP: String,
  date_acces: {type: Date, default: Date.now},
});

Wemos = mongoose.model("Wevos", WemosSchema);

module.exports = Wemos;
