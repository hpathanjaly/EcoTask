const session = require("express-session");
const mongoose = require("mongoose");
const Task = require('../models/task');

const index = (req, res) => {
    const topThree = Task.find().limit(3)
    //console.log(topThree)
    if(req.session){
      res.render('index', { session: req.session });
    }
    else{
      res.render('index');
    }
}
const account = (req, res) => {
    res.render('account');
}
const login = (req, res) => {
    res.render('login', {success: req.query.success, error:req.query.error});
    console.log(req.session);
}
const register = (req, res) => {
    res.render('register', {success: req.query.success, error:req.query.error});
}
function drop(req, res){
    mongoose.connection.db.dropCollection('users', function(err, res){
        if (err) {
            console.log(err);
        }
        else{
            console.log("users dropped");
        }
    })
    mongoose.connection.db.dropCollection('tasks', function(err, res){
        if (err) {
            console.log(err);
        }
        else{
            console.log("tasks dropped");
        }
    })
    res.redirect('/');
}

module.exports = {
    index,
    account,
    login,
    register,
    drop
}