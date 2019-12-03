const Pad = require('../models/Pad');

module.exports = {
    async getHomePads(req,res) {
        const pads = await Pad.find();
        return res.render('pad_index', {'pads': pads});
    },
}