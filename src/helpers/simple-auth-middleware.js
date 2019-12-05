const crypto = require('crypto');
const Pad = require('../models/Pad');

module.exports = async (req, res, next) => {
  let time = +req.headers['x-sauth-time'];

  if ((Date.now()/1000) - time > 100) {
    res.status(401).send({message:"Requisição inválida"});
  }

  let key = req.headers['x-sauth-application-key'];
  let receveidSign = req.headers['x-sauth-application-signature'];
  let pad = await Pad.findById(key);
  if (pad) {
    let hmac = crypto.createHmac('sha1', key);
    let sign = hmac.update(pad.token+time).digest('hex');
    if (receveidSign == sign) {
      next();
    } else {
      res.status(401).send({message:"Assinatura inválida"});
    }
  } else {
    res.status(401).send({message:"Assinatura inválida"});
  }
};