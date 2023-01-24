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
    res.render('register');
}

module.exports = {
    index,
    account,
    login,
    register
}