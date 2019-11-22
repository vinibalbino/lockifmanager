const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Wemos = require('../models/wemos')

router.get('/', function(req,res) {
    Wemos.find().then(function(wemos){
        res.render('wemos_index', {wemos: wemos} ) 
    });
})

router.get('/add', function(req,res){
    res.render('wemos_add', {'wemos': ""});
});

router.get('/:_idWemos', function(req,res){
    const { _idWemos} = req.params;
    Wemos.findOne({ _id :_idWemos }).then(function(wemos){
        console.log(wemos)
        res.render('wemos', {'wemos': wemos });
    });
})

router.get('/:_idWemos/edit', function(req,res){
    const { _idWemos} = req.params;
    Wemos.findOne({ _id :_idWemos }).then(function(wemos){
        console.log(wemos)
        res.render('wemos_edit', {'wemos': wemos });
    });
});


router.get('/:_idwemos/delete',function(req, res) {
    const { _idwemos } = req.params;
    Wemos.findOneAndRemove({ _id: _idwemos }, function(callback) {
        res.redirect('/wemos');
    });
});


router.post('/add', function(req, res){
    const { ipWemos, description } = req.body;
    let ObjectId = mongoose.Types.ObjectId(); 
    if(ipWemos != "" && description != "" ){
        Wemos.findOne( { IP: ipWemos } ).then(function(wemos){
            if(wemos){
                res.render('wemos_add', {'wemos': wemos })
            }else{
                const wemos = new Wemos({
                    _id: ObjectId,
                    IP: ipWemos,
                    description: description,
                    enable: false,
                });  
                wemos.save(function(error){
                    if(error){
                       res.render('error', {error: error});
                    }else{
                        res.redirect('/wemos');
                    }
                });     
            } 
        });
    };
});

router.post('/:_idWemos/edit', function(req,res) {
    const { _idWemos } = req.params;
    const { description } = req.body;
    Wemos.findByIdAndUpdate({ _id: _idWemos} ,  {
        description: description,
    }).then(function(callback){
        console.log(callback)
        res.redirect('/wemos');
    })
});

module.exports = router;