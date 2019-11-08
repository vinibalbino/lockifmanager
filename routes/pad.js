const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Pad = require('../models/pad')

router.get('/add', function(req, res) {
    res.render('pad_add');
});

router.get('/:_idpad', function(req,res){
    const { _idpad } = req.params;
    Pad.findOne( {_id: _idpad}, function(pad){
        res.render('pad', { 'pad': pad })
    })
});


router.post('/add', function(req,res){
    const { macAdress, token  } = req.body;
    let ObjectId = mongoose.Types.ObjectId();
    Pad.findOne({ macAdress: macAdress }).then(function(pad) {
        if(pad){
            console.log("Existe Já mano")
        }else {
            var pad = new Pad({
                _id: ObjectId,
                macAdress,
                token
            });
            pad.save(function(error){
                if(error){
                    res.render('error', {'error': error});
                }else{
                    res.redirect('/pads');
                }
                
            })
        }
    });
}); 
module.exports = router;