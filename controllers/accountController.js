const bcrypt = require('bcrypt');
const User = require('../models/user');
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
                console.log(User.find({ email: user.email }))
                if(!User.find({ email: user.email })){
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
                    console.log("email already in use");
                }
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
    res.redirect('register?success=1')
}
function authenticate(req, res){
    var request = req.body;
    var user = User.find({ email: request.email });
    if(user.exists()){
        bcrypt.compare(request.password, user.password)
            .then(res => {
                if(res == true){
                    //start session
                }
                else{
                    //redirect to login with error
                }
            })
    }

}

module.exports = {
    process,
    authenticate
}