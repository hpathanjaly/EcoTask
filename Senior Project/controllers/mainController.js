const bcrypt = require('bcrypt');
const User = require('../models/user');
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
const process = (req, res) =>{
    var user = req.body;
    console.log(user);
    var pass = user.password;
    var confirm_pass = user.confirm_password;
    var hashPass;
    const saltRouds = 10;
    bcrypt.hash(pass, saltRouds)
    .then(hash => {
        bcrypt.compare(confirm_pass, hash)
        .then(res => {
            console.log(hash);
            if(res == true){
                hashPass = hash;
                console.log(hashPass);
                const newUser = new User({
                    name: user.name, 
                    email: user.email,
                    password: hashPass
                })
                newUser.save()
                    .then(result => {
                        console.log("success creating account");;
                    })
                    .catch(err => {
                        console.log(err);  
                    });
            }
            else{
                console.log('passwords dont match');
            }
        })
        .catch(err => {
            console.error(err.message);
        });
    })
    .catch(err => {
        console.error(err.message);
    });
    res.redirect('register')
}

module.exports = {
    index,
    account,
    login,
    register,
    process
}