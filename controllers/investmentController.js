const mongoose = require('mongoose');
const User = require('../models/user');
const UserInvestments = require('../models/userInvestments')
const Investment = require('../models/investment');

function createAll(req, res){
  Investment.insertMany([
    {
      title: "Smart Thermostat",
      description: "Buy a smart thermostat or create a schedule for your current thermostat",
      carbon_reduce_possibility: "700g",
      image: "https://people.com/thmb/DFzQEoSvkO5lFcDAYm810v0ocVY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/peo-best-smart-thermostats-of-2022-tout-970a1ed0b4b942e78efab70c398849e0.jpg"
    },
    {
        title: "Electric Car",
        description: "Buy an electric car and reduce your consumption and use of fossil fuels. As energy utilizes more renewable resources, your carbon footprint will only decrease with time. Recommended budget: $30,000 - $100,000",
        carbon_reduce_possibility: "About 150 g/mi",
        image: "https://hips.hearstapps.com/hmg-prod/images/editors-choice-03-evs-illustration-by-ryan-olbrysh-640764b313c8f.jpg"
    },
    
  ]).then(res => {
    console.log('investments added');
  }).catch(err => {
    console.log(err);
  });
}
async function addInvestment(req, res){
  if(!req.session.userid){
    res.redirect('/login?error=4');
  }
  else{
    let data = req.body;
    await UserInvestments.create({
        investment_id: data.investmentid,
        user_id: data.userid,
        investment: data.investmentid,
        user: data.userid,
        complete: false,
      });
    res.redirect('/investments');
  }
}

function investment(req, res){
  UserInvestments.findOne({ user_id: req.session.userid, investment_id: req.query.id }).populate('investment').exec((err, userInvestment) => {
    if(userInvestment){
      let investment = userInvestment.investment;
      // console.log(investment)
      let budget = userInvestment.budget;
      if(isNaN(budget) || budget <= 0){
        budget = "Not Set"
      }
      let budgetCompleted = userInvestment.budgetCompleted;
      res.render('investment', { investment, budget, budgetCompleted, complete: userInvestment.complete, success: req.query.success, warning: req.query.warning })
    }
  });
}

function myInvestments(req, res){
  if(!req.session.userid){
    res.redirect('/login?error=4');
  }
  else{
    UserInvestments.find({ user_id: req.session.userid }).populate('investment').populate('user').exec((err, usersInvestments) => {
      if(err){
        console.log(err);
      }
      if(usersInvestments){
        let allInvestments = [];
        let allComplete = [];
        usersInvestments.forEach(userInvestment => {  
          allInvestments.push(userInvestment.investment);
          allComplete.push(userInvestment.complete)
        })
        //console.log(allTasks);
        res.render('myInvestments', { investments: allInvestments, completed: allComplete });
      }
    });
  }
}

async function deleteInvestment(req, res) {
  if (!req.session.userid) res.redirect('/login?error=4');
  else {
    UserInvestments.deleteOne({ investment_id: req.body.investmentid, user_id: req.session.userid }).then((err, success) => {
      console.log(success);
    })
    res.redirect('/myInvestments')
    console.log('investment deleted')
  }
}

module.exports = {
  createAll,
  addInvestment,
  myInvestments,
  investment,
  deleteInvestment
}
