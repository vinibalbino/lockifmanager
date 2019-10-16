var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var ReportSchema = new Schema({
    _idUser: {type: ObjectId, ref: "User" },
    dateAcces: {type: Date, default: Date.now}
});

ReportCard = mongoose.model("Report", ReportSchema);

module.exports = ReportCard;