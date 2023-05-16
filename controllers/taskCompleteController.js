const tasksCompleted = require('../models/tasksCompleted');
const Task = require('../models/task');
const UserTasks = require('../models/userTasks');

async function setTime(req, res) {
  let time;
  const data = req.body;
  let selectedTime = data.time;
  const mSecInDay = 24 * 60 * 60 * 1000;
  const mSecInHour = 60 * 60 * 1000;
  const mSecInMin = 60 * 1000;
  if (selectedTime == 'days') {
    time = data.length * mSecInDay
  }
  if (selectedTime == 'hours') {
    time = data.length * mSecInHour
  }
  if (selectedTime == 'minutes') {
    time = data.length * mSecInMin
  }
  await UserTasks.updateOne({user_id: req.session.userid, task_id: data.taskid }, { $set: {notification: time} });
  res.redirect('/task?id=' + data.taskid + '&success=1')
}
async function complete(req, res) {
  task_id = req.query.id;
  let currentTask = await UserTasks.findOne({ task_id, user_id: req.session.userid })
  if (currentTask.notification > 0){
    await UserTasks.updateOne({ user_id: req.session.userid, task_id }, { $set: { complete: true } });
    makeFalse(req.session.userid, task_id);
    res.redirect('myTasks');
  } 
  else res.redirect('myTasks?error=1');
}

async function makeFalse(user_id, task_id){
  await UserTasks.findOne({ user_id, task_id }, async (err, userTask) => {
    let notification = userTask.notification;
    let x = setInterval( async () => {
      notification -= 1000;
      await UserTasks.updateOne({ user_id, task_id }, { $set: { timeRemaining: notification }})
      if(notification == 0){
        clearInterval(x);
        await UserTasks.updateOne({ user_id, task_id }, { $set: { complete: false, timeRemaining: null } })
      }
    }, 1000);
  }).clone().catch((err)=>{console.log(err)});
}

module.exports = {
  setTime,
  complete
}