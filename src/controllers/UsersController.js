const User = require('../models/User')

module.exports = {
    async getAllUsers(req,res){
        const users = await User.find();
        res.render('users_index', {'users': users})
    },
}