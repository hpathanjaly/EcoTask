const tasksCompleted = require('../models/tasksCompleted');
const Task = require('../models/task');
const UserInvestments = require('../models/userInvestments');

async function setBudget(req, res) {
  const data = req.body;
  let budget = data.budget;
  console.log(req.session.userid)
  console.log(data.investmentid)
  console.log(budget)
  await UserInvestments.updateOne({user_id: req.session.userid, investment_id: data.investmentid }, { $set: {budget} });
  console.log("updated")
  res.redirect('/investment?id=' + data.investmentid + '&success=1')
}

async function updateBudget(req, res){
  const data = req.body;
  let moneyAdded = Number(data.moneyAdded);
  let currentInvestment = await UserInvestments.findOne({user_id: req.session.userid, investment_id: data.investmentid});
  let currentAdded = currentInvestment.budgetCompleted                               
  console.log(currentAdded)
  if(currentAdded && !isNaN(currentAdded)) moneyAdded += currentAdded;
  console.log(moneyAdded)
  await UserInvestments.updateOne({user_id: req.session.userid, investment_id: data.investmentid }, { $set: {budgetCompleted: moneyAdded} });
  res.redirect('/investment?id=' + data.investmentid + '&success=2')
}

async function complete(req, res) {
  investment_id = req.query.id;
  console.log(investment_id);
  let currentInvestment = await UserInvestments.findOne({ investment_id, user_id: req.session.userid })
  console.log(currentInvestment.budget)
  if (currentInvestment.budgetCompleted == currentInvestment.budget || req.query.complete == "true"){
    await UserInvestments.updateOne({ user_id: req.session.userid, investment_id }, { $set: { complete: true } });
    res.redirect('myInvestments');
  } 
  else res.redirect('investment?id=' + investment_id + '&warning=1');
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
  setBudget,
  complete,
  updateBudget
}