const session = require("express-session");

const index = (req, res) => {
    res.render('index');
}
const account = (req, res) => {
    res.render('account');
}
const login = (req, res) => {
    res.render('login', {success: req.query.success, error:req.query.error});
    console.log(req.session.userid);
}
const register = (req, res) => {
    res.render('register', {success: req.query.success, error:req.query.error});
}

module.exports = {
    index,
    account,
    login,
    register
}