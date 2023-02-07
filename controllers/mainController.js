const session = require("express-session");
const mongoose = require("mongoose");
const Task = require('../models/task');

async function index(req, res){
    let allTasks = await Task.find().limit(3)
    let topThree = allTasks
    console.log(topThree)
    res.render('index', {topThree});
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