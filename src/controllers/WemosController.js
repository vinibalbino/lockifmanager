const Wemos = require('../models/Wemos');
const mongoose = require('mongoose');
const axios = require('axios');
const crypto = require('crypto');

const sign = (time, token, mac) => {
  let hmac = crypto.createHmac('sha1', mac);
  hmac.update(token+time);
  return hmac.digest('hex');
}

const createHeaders = (token, mac) => {
  let time = Date.now()/1000;
  let signature = sign(time, token, mac);
  return {
    'x-sauth-time': time,
    'x-sauth-application-signature': signature,
  };
}

module.exports = {
    async getWemos(req, res){
      const wemos = await Wemos.find();
      res.render('wemos_index', { 'wemos': wemos, 'msg': "" , 'error': true})
    },
    getAddForm(req, res) {
      res.render('wemos_add', { 'wemos': "", 'msg': "" , 'error': false });
    },
    async getOneWemos(req, res){
      const { _idWemos} = req.params;
      const wemos = await Wemos.findOne({ _id :_idWemos });
      res.render('wemos', {'wemos': wemos });
    },
    async disableWemos(req, res) {
      const { _idWemos } = req.params;
      let wemos = await Wemos.findOne({ _id :_idWemos });
      if (!wemos) {
        res.redirect('/wemos');
      }
      try {
        let response = await axios(`${wemos.IP}/disable`, {
          headers: createHeaders(wemos.token, wemos.macAddress)
        });
        var {message} = response.data;
        await Wemos.findOneAndRemove( { _id: _idWemos  } );
        res.redirect('/wemos');
      } catch(e) {
        //TODO: Redirecionar para a lista de wemos  com a mensagem de erro.
        //A mensagem que vem do servidor está em e.response.data.message
        var message = e.response.data.message;
        let wemos = await Wemos.find();
        res.render('wemos_index', { 'wemos': wemos, 'msg': message , 'error': true});
      }   
    },
    async testWemos (req, res) {
      const { _idWemos } = req.params;
      let wemos = await Wemos.findOne({ _id :_idWemos });
      if (!wemos) {
        res.redirect('/wemos');
      }
      try {
        let response = await axios(`${wemos.IP}/open`, {
          headers: createHeaders(wemos.token, wemos.macAddress)
        });
        res.redirect('/wemos');
      } catch(e) {
        //TODO: Redirecionar para a lista de wemos  com a mensagem de erro.
        var message = e.response.data.message;
        let wemos = await Wemos.find();
        res.render('wemos_index', { 'wemos': wemos, 'msg': message , 'error': true});
      } 
    },
    async getEditForm(req, res){
      const { _idWemos} = req.params;
      const wemos = await Wemos.findOne({ _id: _idWemos });
      res.render('wemos_edit', { 'wemos': wemos } );
    },
    async deleteWemos(req, res){
      const { _idWemos  } = req.params;
      await Wemos.findOneAndRemove( { _id: _idWemos  } );
      res.redirect('/wemos');
    },
    async addWemos(req, res){
      const { ipWemos, description } = req.body;
      try {
        let res = await axios(`${ipWemos}/enable`);
        var {token, mac} = res.data;
        console.log(res.data);
      } catch(e) {
        //TODO: Redirecionar para o formulário com a mensagem de erro.
        //A mensagem que vem do servidor está em e.response.data.message
        var message = e.response.data.message;
        res.render('wemos_add', { 'msg': message , 'error': true});
        return;
      }      

      if(ipWemos != "" && description != ""){
          let wemos = await Wemos.findOne( { IP: ipWemos }  );
          if(wemos){
            res.render('wemos_add', {'wemos': wemos })
          }else {
            let ObjectId = mongoose.Types.ObjectId(); 
            let wemos = new Wemos({
              _id: ObjectId,
              IP: ipWemos,
              token: token,
              macAddress: mac,
              description: description,
              enable: false,
            });
            await wemos.save(function(error){
              if(error){
                res.status(400).send({'error': error  });
              }else{
                res.redirect('/wemos');
              }
            });
          }
      }else {
        res.render('wemos_add');
      }
    },
    async editWemos(req, res){
      const { _idWemos } = req.params;
      const { description } = req.body;
      await Wemos.findByIdAndUpdate( {_id: _idWemos}, { description: description } );
      res.redirect('/wemos');
    }
}