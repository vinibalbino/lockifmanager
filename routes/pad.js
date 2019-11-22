const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pad = require('../models/pad')
const uuid = require('uuid-random');

router.get('/add', function(req, res) {
    res.render('pad_add');
});

router.get('/:_idpad', function(req,res){
    const { _idpad } = req.params;
    console.log(_idpad);
    Pad.findOne( { _id: _idpad}).then(function(pad){
        console.log(pad);
        res.render('pad', { 'pad': pad })
    });
});

router.get('/:_idPad/edit',function(req,res){
    const { _idPad } = req.params;
    Pad.findOne( {_id: _idPad }).then(function(pad){
        res.render('pad_edit', {'pad': pad});
    });
});

router.get('/:_idPad/delete', function(req, res, next) {
    const { _idPad } = req.params;
    Pad.findOneAndRemove( { _id: _idPad} ).then(function(callback){
        res.redirect('/pads');
    });
});

router.post('/add', function(req,res){
    const { macAdress, name  } = req.body;
    let ObjectId = mongoose.Types.ObjectId();
    let token = uuid();
    Pad.findOne({ macAdress: macAdress }).then(function(pad) {
        if(pad){
            res.send('Pad já existente');
        }else {
            let pad = new Pad({
                _id: ObjectId,
                name: name,
                macAdress,
                token,
                wemos: "",
            });
            pad.save(function(error){
                if(error){
                    res.send('error', {'error': error});
                }else{
                    res.send({'token': pad.token})
                }
            })
        }
    });
});
router.post('/:_idpad/edit', function(req,res){
    const { _idpad } = req.params;
    const { name } = req.body; 
    Pad.findOneAndUpdate( { _id: _idpad }, {
        name, 
    }).then(function(callback){
        res.redirect('/pads')
    })
});

module.exports = router;