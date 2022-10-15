function logOut(req, res){
 
    req.session = null;
    req.session.destroy();
}

module.exports = logOut;