module.exports = {
  getLoginPage(req, res){
    res.render('login', { message: "" });
  },
  login(req,res){
    res.redirect('/');
  },
}