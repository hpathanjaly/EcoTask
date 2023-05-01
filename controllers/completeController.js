const tasksCompleted = require('../models/tasksCompleted');
const Task = require('../models/task');

async function setTime(req, res) {
  let time;
  const data = req.body;
  let selectedTime = data.time;
  const mSecInDay = 24 * 60 * 60 * 1000;
  const mSecInHour = 60 * 60 * 1000
  const mSecInMin = 60 * 1000
  if (selectedTime == 'days') {
    time = data.length * mSecInDay
  }
  await Task.updateOne({ _id: data.taskid }, { notification: time });
  res.redirect('/task?id=' + data.taskid + '&success=1')
}
function complete(req, res) {
  console.log(req.session.userid)
  task_id = req.query.id;
  const newComplete = new tasksCompleted({
    task_id: task_id,
    user_id: req.session.userid
  });
  newComplete.save()
    .then(success => { console.log('task completed') })
    .catch(err => { console.log(err) });
}

module.exports = {
  setTime,
  complete
}