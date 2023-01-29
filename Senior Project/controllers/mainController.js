const index = (req, res) => {
    res.render('index');
}
const account = (req, res) => {
    res.render('account');
}
const login = (req, res) => {
    res.render('login');
}
const register = (req, res) => {
    res.render('register', {success: req.query.success});
}

module.exports = {
    index,
    account,
    login,
    register
}