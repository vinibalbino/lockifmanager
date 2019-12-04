module.exports = {
    getHomePage(req, res){
        return res.render('index', { title: 'LockIFmanager' });
    }
}