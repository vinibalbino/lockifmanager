const Wemos = require('../models/Wemos');

module.exports = {
    async getWemos(req, res){
        const wemos = await Wemos.find();
        res.render('wemos_index', { wemos: wemos });
    },
    getAddForm(req, res) {
      res.render('wemos_add', { 'wemos': "" });
    },
    async getOneWemos(req, res){
      const { _idWemos} = req.params;
      const wemos = await Wemos.findOne({ _id :_idWemos });
      res.render('wemos', {'wemos': wemos });
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
      const token = await fetch(`${ipWemos}/enable`);
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