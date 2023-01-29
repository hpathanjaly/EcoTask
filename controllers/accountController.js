const bcrypt = require('bcrypt');
const User = require('../models/user');
const process = (req, res) =>{
    var user = req.body;
    //console.log(user);
    var pass = user.password;
    var confirm_pass = user.confirm_password;
    var hashPass;
    const saltRouds = 10;
    bcrypt.hash(pass, saltRouds)
    .then(hash => {
        bcrypt.compare(confirm_pass, hash)
        .then(result => {
            //console.log(hash);
            if(result == true){
                console.log(user.email);
                User.findOne({ email: user.email }, function(err, check){
                    if(err){
                        console.log(err);
                    }
                    console.log(check);
                    if(!check){
                        hashPass = hash;
                        //console.log(hashPass);
                        const newUser = new User({
                            name: user.name, 
                            email: user.email,
                            password: hashPass
                        })
                        console.log(newUser);
                        newUser.save()
                            .then(result => {
                                console.log("success creating account");;
                            })
                            .catch(err => {
                                console.log(err);  
                            });
                        res.redirect('register?success=1')
                    }
                    else{
                        res.redirect('register?error=2')
                    }
                })
            //     if(User.find({ email: user.email }).email == null){
            //         hashPass = hash;
            //         //console.log(hashPass);
            //         const newUser = new User({
            //             name: user.name, 
            //             email: user.email,
            //             password: hashPass
            //         })
            //         console.log(newUser);
            //         newUser.save()
            //             .then(result => {
            //                 console.log("success creating account");;
            //             })
            //             .catch(err => {
            //                 console.log(err);  
            //             });
            //     }
            //     else{
            //         console.log("email already in use");
            //     }
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