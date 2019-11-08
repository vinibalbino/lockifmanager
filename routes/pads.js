const express = require('express');
const router = express.Router();
const Pad = require('../models/pad')

router.get('/', function(req, res, next) {
  Pad.find().then(function(pads) {
    res.render('pad_index', {'pads': pads});
  });
});

module.exports = router;