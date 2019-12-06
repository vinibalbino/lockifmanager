// const User = require('../	models/User')
const mongoose = require('mongoose');

module.exports = {
	getAddForm(req, res){
			res.render('users_add', {error: null});
	},
	async getUser(req, res){
			const { userId } = req.params;
			const user = await User.findOne( {cpf: userId} ).populate('projects');
			res.render('user', {'user': user,'error': false });   
	},
	async deleteUser(req,res){
			const { userId } = req.params;
			const user = await User.findOne({ cpf: userId }).populate('projects');
			if(( user.projects ).length != 0 ){
					res.render('user', {'user': user,'error': true });
			}else{
					await User.findOneAndRemove({cpf: userId});
					res.redirect('/users');
			}
	},
	async getEditForm(req, res){
		const { userId } = req.params;
		const user = await User.findOne({cpf: userId});
		res.render('user_edit', {'user': user });
	},
	async addUser(req, res){
		const { name, cpf, birth_date } = req.body;
		const userExist = await User.findOne({ cpf: cpf});
		if(userExist){
			res.render('users_add', {error: 'CPF já cadastrado'});
		}else{
			let ObjectId = mongoose.Types.ObjectId();
			let user = new User({
				_id: ObjectId,
				name, cpf, birth_date,
				active: true,
				blocked: true,
			});
			await user.save(function(error){
							if(error){
								res.render('error', {error: error});
							}else {
								res.redirect('/users');
							}
						}); 
		}
	},
	async editUser(req, res){
		const { userId } = req.params;
		const { name, cpf, birth_date, active, blocked } = req.body
		User.findOneAndUpdate({ cpf: userID}, {
			name, cpf, birth_date, active, blocked,
		});
		res.redirect('/users')
	},
}
