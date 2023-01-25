const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const completeSchema = new Schema({
  task_id: {
    type: Number,
    required: true,
  },
  account_id: {
    type: Number,
    required: true
  },
});

const Complete = mongoose.model('Complete', completeSchema);
module.exports = Complete;