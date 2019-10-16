var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Wemos = require('../models/wemos')

router.get('/', function(req,res) {
    Wemos.find().then(function(wemos){
        res.render('wemos_index', {wemos: wemos} ) 
    });
})

router.get('/add', function(req,res){
    res.render('wemos_add');
});

router.post('/add', function(req, res){
    var {ipWemos, description} = req.body;
    var ObjectId = mongoose.Types.ObjectId(); 
    if(ipWemos != "" && description != "" ){
        var wemos = new Wemos({
            _id: ObjectId,
            IP: ipWemos,
            description: description,
        });   
    }
});

module.exports = router;