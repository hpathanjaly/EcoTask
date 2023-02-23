const session = require("express-session");
const mongoose = require("mongoose");
const Task = require('../models/task');
const Investment = require('../models/investment');

async function index(req, res){
    let topThree = await Task.find().limit(3)
    //console.log(topThree)
    res.render('index', {topThree, session: req.session});
}
async function tasks(req, res){
  let tasks = await Task.find()
  res.render('tasks', {tasks, session: req.session})
}
async function investments(req, res){
  let investments = await Investment.find()
  res.render('investments', {investments, session: req.session})
}
const account = (req, res) => {
    res.render('account', {session});
}
const login = (req, res) => {
    res.render('login', {success: req.query.success, error:req.query.error, session: req.session});
    console.log(req.session.userid);
}
const register = (req, res) => {
    res.render('register', {success: req.query.success, error:req.query.error, session: req.session});
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
  mongoose.connection.db.dropCollection('investments', function(err, res){
        if (err) {
            console.log(err);
        }
        else{
            console.log("investments dropped");
        }
    })
  mongoose.connection.db.dropCollection('usertasks', function(err, res){
        if (err) {
            console.log(err);
        }
        else{
            console.log("usertasks dropped");
        }
    })
    res.redirect('/');
}

module.exports = {
    index,
    account,
    login,
    register,
    drop,
    tasks,
    investments
}