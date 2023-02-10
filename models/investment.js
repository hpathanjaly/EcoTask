const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const investmentSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  carbon_reduce_possibility: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

const Investment = mongoose.model('Investment', investmentSchema);
module.exports = Investment;