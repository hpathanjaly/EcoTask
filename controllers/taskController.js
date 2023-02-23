const appVar = require('../app');
const mongoose = require('mongoose');
const Task = require('../models/task');
const User = require('../models/user');
const UserTasks = require('../models/userTasks')
const Investment = require('../models/investment');

function createAll(req, res){
  Investment.insertMany([
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700,
      image: "https://people.com/thmb/DFzQEoSvkO5lFcDAYm810v0ocVY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/peo-best-smart-thermostats-of-2022-tout-970a1ed0b4b942e78efab70c398849e0.jpg"
    },
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700
    },
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700
    },
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700
    }
  ]).then(res => {
    console.log('tasks added');
  }).catch(err => {
    console.log(err);
  });
  Task.insertMany([
    {
      title: "Turn Lights Off",
      description: "Turn off your lights when youre done with them. It will take one 100W bulb 10 hours to use one killowatt. Turning off your lights when they're not in use can have an important impact",
      carbon_reduce_possibility: "0.43kwh per bulb",
      image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F34%2F2019%2F05%2F12170729%2Fswitching-on-light-getty-0519.jpg&q=60"
    },
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700
    },
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700
    },
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: 700
    }
  ]).then(res => {
    console.log('tasks added');
  }).catch(err => {
    console.log(err);
  });
  res.redirect('/');
}
async function addTask(req, res){
  let data = req.body;
  console.log(data.taskid);
  console.log(data)
  const newUserTask = await UserTasks.create({
      task_id: data.taskid,
      user_id: data.userid,
      task: data.taskid,
      user: data.userid
    });
  console.log(newUserTask)
  UserTasks.findOne({task_id: data.taskid}).populate('task').populate('user').exec((err, usertask) => {
    console.log(usertask.task)
  });
  //newUserTask = await newUserTask.populate("task").populate('user').exec()
  //console.log(newUserTask.task.name)
  
  // newUserTask.populate("user").exec(function(err, res){
  //   if(err){
  //     console.log(err);
  //   }
  // });
  // console.log(newUserTask.user.name);
  res.redirect('/tasks');
}
module.exports = {
  createAll,
  addTask
}
