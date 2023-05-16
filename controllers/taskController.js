const mongoose = require('mongoose');
const Task = require('../models/task');
const User = require('../models/user');
const UserTasks = require('../models/userTasks')

function createAll(req, res) {
  Task.insertMany([
    {
      title: "Turn Lights Off",
      description: "Turn off your lights when youre done with them. It will take one 100W bulb 10 hours to use one killowatt. Turning off your lights when they're not in use can have an important impact",
      carbon_reduce_possibility: "0.43kwh per bulb",
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2019%2F05%2F12170729%2Fswitching-on-light-getty-0519.jpg&q=60"
    },
    {
      title: "Ride Your Bike",
      description: "Ride your bike instead of taking your car for short trips. Riding your bike can save you money and can help save the environment. Nearly 40% of trips taken in the US are 2 miles or less so taking your bike can be safer, cleaner, and maybe faster.",
      carbon_reduce_possibility: "370 g/mi",
      image: "https://momentummag.com/wp-content/uploads/2015/08/Advocacy_First_Time_Bike_Commuters.jpg",
    }
  ]).then(res => {
    console.log('tasks added');
  }).catch(err => {
    console.log(err);
  });
}
async function addTask(req, res) {
  let data = req.body;
  console.log(data.taskid);
  console.log(data)
  await UserTasks.create({
    task_id: data.taskid,
    user_id: data.userid,
    complete: false,
    task: data.taskid,
    user: data.userid
  });
  res.redirect('/tasks');
}
async function myTasks(req, res) {
  if (!req.session.userid) {
    res.redirect('/login?error=4');
  }
  else {
    UserTasks.find({ user_id: req.session.userid }).populate('task').populate('user').exec((err, usersTasks) => {
      if (err) {
        console.log(err);
      }
      if (usersTasks) {
        let allTasks = [];
        let allComplete = [];
        usersTasks.forEach(userTask => {
          allTasks.push(userTask.task);
          allComplete.push(userTask.complete);
        })
        res.render('myTasks', { tasks: allTasks, completed: allComplete });
      }
    });
  }
}

//render task page based on id
async function task(req, res) {  
  UserTasks.findOne({ task_id: req.query.id, user_id: req.session.userid }).populate('task').exec((err, usersTask)=>{
    if(usersTask){
      let task = usersTask.task;
      let notifNum = usersTask.notification;
      let timeRemaining = usersTask.timeRemaining
      let notification; 
      if(!isNaN(notifNum) && notifNum  > 0){ 
        notfication = notifNum/1000/60;
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
      else notification = "Not set"
      console.log(notification)
      res.render('task', { task, session: req.session, success: req.query.success, notification, complete: usersTask.complete, timeRemaining })
    }
  });
}

async function deleteTask(req, res) {
  if (!req.session.userid) res.redirect('/login?error=4');
  else {
    await UserTasks.deleteOne({ task_id: req.body.taskid, user_id: req.session.userid })
    res.redirect('/myTasks')
    console.log('task deleted')
  }
}

module.exports = {
  createAll,
  addTask,
  myTasks,
  deleteTask,
  task
}
