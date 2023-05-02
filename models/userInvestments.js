const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userInvestmentSchema = new Schema({
  investment_id: {
    type: String,
    required: false
  },
  user_id: {
    type: String,
    required: false
  },
  time: {
    type: Number,
    required: false
  },
  notification: {
    type: Number,
    required: false,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  investment: { type: Schema.Types.ObjectId, ref: "Investment" }
});

const UserInvestment = mongoose.model('UserInvestment', userInvestmentSchema);
module.exports = UserInvestment;