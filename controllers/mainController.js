const session = require("express-session");
const mongoose = require("mongoose");
const User = require("../models/user");
const Task = require('../models/task');
const Investment = require('../models/investment');
const UserTasks = require('../models/userTasks');
const UserInvestments = require('../models/userInvestments');
const taskController = require('../controllers/taskController');
const investmentController = require('../controllers/investmentController');

//render index
async function index(req, res) {
  if(req.session.userid){
    res.redirect('/account');
  }
  else{
    res.redirect('/login')
  }
}
//render tasks
async function tasks(req, res) {
  let allTasks = await Task.find();
  let tasks = [];
  if(req.session.userid){
    let usersTasks = await UserTasks.find({ user_id: req.session.userid });
    allTasks.forEach((task)=>{
      let added = false
      usersTasks.forEach((userTask) =>{
        if(task._id == userTask.task_id){
          added = true;
        }
      })
      if(!added) tasks.push(task);
    })
  }
  else allTasks.forEach((task)=>{ tasks.push(task) });
  res.render('tasks', { tasks, session: req.session })
}

//render investments
async function investments(req, res) {
  let allInvestments = await Investment.find();
  let investments = [];
  if(req.session.userid){
    let usersInvestments = await UserInvestments.find({ user_id: req.session.userid });
    allInvestments.forEach((investment)=>{
      let added = false;
      usersInvestments.forEach((userInvestment) =>{
        if(investment._id == userInvestment.investment_id){
          added = true;
        }
      })
      if(!added) investments.push(investment);
    })
  }
  else allInvestments.forEach((investment)=>{ investments.push(investment) });
  res.render('investments', { investments, session: req.session })
}
//render account
const account = async (req, res) => {
  if(req.session.userid){
    let user = await User.findOne({ _id: req.session.userid });
    res.render('account', { user });
  }
  else{
    res.redirect('/login?error=4')
  }
}
//render login
const login = (req, res) => {
  res.render('login', { success: req.query.success, error: req.query.error, session: req.session });
  console.log(req.session.userid);
}
//render register
const register = (req, res) => {
  res.render('register', { success: req.query.success, error: req.query.error, session: req.session });
}
//drop tables function
function drop(req, res) {
  mongoose.connection.db.dropCollection('users', function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("users dropped");
    }
  })
  mongoose.connection.db.dropCollection('tasks', function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("tasks dropped");
    }
  })
  res.redirect('/');
  mongoose.connection.db.dropCollection('investments', function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("investments dropped");
    }
  })
  mongoose.connection.db.dropCollection('usertasks', function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("usertasks dropped");
    }
  })
  mongoose.connection.db.dropCollection('userinvestments', function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("userinvestments dropped");
    }
  })
  mongoose.connection.db.dropCollection('taskscompleted', function(err, res) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("userinvestments dropped");
    }
  })
  res.redirect('/');
}
//create tasks and investments
function create(req, res) {
  taskController.createAll();
  investmentController.createAll();
  res.redirect('/')
}

module.exports = {
  index,
  account,
  login,
  register,
  drop,
  tasks,
  investments,
  create
}