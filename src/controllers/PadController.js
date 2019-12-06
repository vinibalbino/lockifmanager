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

    async checkWemos(req, res) {
        const { _idPad } = req.params;
        const pad = await Pad.findOne( { _id: _idPad } ).populate('wemos')
        if(pad){
            res.status(200).send(pad);
        }else {
            res.status(500).send({error: 'Pad não encontrado'});
        }
    },

    async deletePad(req,res){
        const { _idPad } = req.params;
        await Pad.findOneAndRemove( { _id: _idPad } );
        res.redirect('/pads');
    },
    async addPad(req, res){
        const { macAddress, name  } = req.body;
        let token = uuid();
        let pad = await Pad.findOneAndUpdate( { macAddress: macAddress}, {
					name: name,
					token: token
        },{ new: true });
        if(!pad){
					let pad = new Pad({
						_id: ObjectId,
						macAddress: macAddress,
						name: name,
						token: token,
					});
					await pad.save( error => {
							if(error){
								res.send('error', {'error': error});
							}else{
								res.send( {'token' : pad.token, 'id': pad._id });
							}
					});
        }else {
					res.send({'token': pad.token, 'id': pad._id });
        };
    },
    async editPad(req, res){
        const { _idPad } = req.params;
				const { name, wemos } = req.body;
				//const wemos = await Wemos.findOne({ ipWemos: ipWemos });
        await Pad.findOneAndUpdate( { _id: _idPad }, {
						name: name,
						wemos: wemos,
				}),
        res.redirect('/pads');
    }
}