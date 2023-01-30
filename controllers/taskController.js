const appVar = require('../app');
const mongoose = require('mongoose')
const Task = require('../models/task');

function createTasks(req, res){
  Task.insertMany([
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
module.exports = {createTasks}
