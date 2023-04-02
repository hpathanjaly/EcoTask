const bcrypt = require('bcrypt');
const User = require('../models/user');
const process = (req, res) => {
  var user = req.body;
  var pass = user.password;
  var confirm_pass = user.confirm_password;
  var hashPass;
  const saltRouds = 10;
  bcrypt.hash(pass, saltRouds)
    .then(hash => {
      bcrypt.compare(confirm_pass, hash)
        .then(result => {
          if (result == true) {
            User.findOne({ email: user.email }, function(err, check) {
              if (err) {
                console.log(err);
              }
              if (!check) {
                hashPass = hash;
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
                res.redirect('register?success=1')
              }
              else {
                res.redirect('register?error=2')
              }
            })
          }
          else {
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
function authenticate(req, res) {
  if (req.session.userid) {
    res.redirect("login?error=5")
  }
  else {
    var request = req.body;
    User.findOne({ email: request.email }, async function(err, user) {
      if (user) {
        const valid = await bcrypt.compare(request.password, user.password);
        if (valid) {
          session = req.session
          session.userid = user._id;
          console.log(session.userid);
          res.redirect('login?success=1')
        }
        else {
          //redirect to login with error
          res.redirect('login?error=2')
        }
      }
      else {
        res.redirect('login?error=1')
      }
    });
  }
}
function logout(req, res) {
  if (req.session.userid) {
    req.session.destroy();
    res.redirect("login?success=2")
  }
  else {
    res.redirect('login?error=3');
  }
}

module.exports = {
  process,
  authenticate,
  logout
}