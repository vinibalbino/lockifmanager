const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt')


passport.use(new Strategy(
  async function(username, password, cb) {
    console.log(username);
    console.log(password);
    try{
      let admin = await Admin.findOne({username: username});
      console.log(admin)
      if (!admin) {
        console.log('1')
        return cb(null, false, {message: 'Usuário ou senha incorretos'});
      }
      if (password != admin.password) {
        console.log('2')
        return cb(null, false, {message: 'Usuário ou senha incorretos'});
      }
      console.log('3')
      return cb(null, admin);

    } catch(e){
      if (err) {
        return cb(err);
      }
      console.log('akshdjkahksjdhkahjksdha');
    } 
}));

passport.serializeUser(function(user, cb) {
  console.log(user)
  cb(null, user._id);
});
  
passport.deserializeUser( async function(id, cb) {
  console.log(id)
  console.log(cb);
  try{
    let user = await Admin.findById(id);
    if(!user){
      return;
    }
    if(user){
      return cb(null, user);
    }
  } catch(err){
    if (err) {
      return cb(err);
    }
  }
});