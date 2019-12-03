const mongoose = require('mongoose');
const Wemos = require('../models/Wemos');
const uuid = require('uuid-random');
const Pad = require('../models/Pad');

module.exports = {
    getAddForm(req, res){
        res.render('pad_add');
    },
    async getPad(req, res){
        const { _idPad } = req.params;
        const pad = await Pad.findOne( { _id: _idPad } )
        if(pad){
            res.render('pad', { 'pad': pad })
        }else {
            alert('Pad Não encontrado');
            res.redirect('/pads');
        }
    },
    async getEditForm(req, res){
        const { _idPad } = req.params;
        const pad = await Pad.findOne( {_id: _idPad} );
        const wemos = await Wemos.find();
        res.render('pad_edit', { 'pad': pad, 'wemos': wemos   })
    },
    async deletePad(req,res){
        const { _idPad } = req.params;
        await Pad.findOneAndRemove( { _id: _idPad } );
        res.redirect('/pads');
    },
    async addPad(req, res){
        const { macAdress, name  } = req.body;
        const pad = await Pad.findOne( { macAdress: macAdress} );
        if(pad){
            setTimeout( () => {
                 alert("Pad já existente"); 
            }, 2000);
        }else {
            let token = uuid();
            let ObjectId = mongoose.Types.ObjectId();
            let pad = new Pad({
                _id: ObjectId,
                name: name,
                token,
                wemos: "",
            });
            await pad.save( error => {
                if(error){
                    res.send('error', {'error': error});
                }else{
                    res.send( {'token' : pad.token });
                }
            });
        };
    },
    async editPad(req, res){
        const { _idPad } = req.params;
        const { name } = req.body;
        await Pad.findOneAndUpdate( { _id: _idPad }, {
            name,
        }),
        res.redirect('/pads');
    }
}