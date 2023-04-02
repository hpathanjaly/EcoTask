const mongoose = require('mongoose');
const User = require('../models/user');
const UserInvestments = require('../models/userInvestments')
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
    console.log('investments added');
  }).catch(err => {
    console.log(err);
  });
}
async function addInvestment(req, res){
  if(!req.session.userid){
    res.redirect('/login?error=4');
  }
  let data = req.body;
  //console.log(data.inve);
  //console.log(data)
  await UserInvestments.create({
      investment_id: data.investmentid,
      user_id: data.userid,
      investment: data.investmentid,
      user: data.userid
    });
  res.redirect('/tasks');
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
        usersInvestments.forEach(userInvestment => {  
          allInvestments.push(userInvestment.investment);
        })
        //console.log(allTasks);
        res.render('myInvestments', { investments: allInvestments });
      }
    });
  }
}

module.exports = {
  createAll,
  addInvestment,
  myInvestments
}
