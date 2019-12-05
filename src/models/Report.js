const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ReportSchema = new Schema({
    _id: { type: ObjectId },
    _idUser: { type: ObjectId, ref: "User" },
    dateAcces: { type: Date, default: Date.now }
});

module.exports =  mongoose.model("Report", ReportSchema);