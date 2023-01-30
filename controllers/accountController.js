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
            }
            else{
                res.redirect('register?error=1');
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
    //console.log(request);
    User.findOne({ email: request.email }, async function(err, user){
        if(user){
            //console.log(user.password);
            const valid = await bcrypt.compare(request.password, user.password);
                if(valid){
                    session =  req.session
                    session.userid = user._id;
                    console.log(session.userid);
                    res.redirect('login?success=1')
                }
                else{
                    //redirect to login with error
                    res.redirect('login?error=2')
                }
        }
        else{
            res.redirect('login?error=1')
        }
    });
}
function logout(req, res){
    console.log(req.session);
    if(req.session){
        req.session.destroy((err) => {
            if(err){
                console.log(err);
            }
            else{
                res.redirect('login?success=2');
            }
        })
    }
}

module.exports = {
    process,
    authenticate,
    logout
}