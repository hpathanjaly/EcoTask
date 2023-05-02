const session = require("express-session");
const mongoose = require("mongoose");
const Task = require('../models/task');
const Investment = require('../models/investment');
const UserTasks = require('../models/userTasks');
const taskController = require('../controllers/taskController');
const investmentController = require('../controllers/investmentController');

//render index
async function index(req, res) {
  let topThree = await Task.find().limit(3)
  //console.log(topThree)
  res.render('index', { topThree, session: req.session });
}
//render tasks
async function tasks(req, res) {
  let tasks = await Task.find()
  res.render('tasks', { tasks, session: req.session })
}
//render task page based on id
async function task(req, res) {
  await UserTasks.findOne({ task_id: req.query.id, user_id: req.session.userid }).populate('task').exec((err, usersTask)=>{
    if(usersTask){
      let task = usersTask.task;
      let notification = (usersTask.notification)/1000/60;
      if(!isNaN(notification)){ 
        if( notification > 60){
          notification /= 60;
          if (notification > 24 && notification % 24 == 0) {
            notification /= 24
            notification += " days"
          }
          else notification += " hours";
        }
        else notification += " minutes";
      }
      else notification += "Not set"
      console.log(notification)
      res.render('task', { task, session: req.session, success: req.query.success, notification })
    }
  });
}
//render investments
async function investments(req, res) {
  let investments = await Investment.find()
  res.render('investments', { investments, session: req.session })
}
//render account
const account = (req, res) => {
  res.render('account', { session });
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
  res.redirect('/');
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
  create,
  task
}