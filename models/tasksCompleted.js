const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTask = new Schema({
  task_id: {
    type: String,
    required: true,
  },
  account_id: {
    type: String,
    required: true
  },
});

const UserTask = mongoose.model('UserTask', userTask);
module.exports = UserTask;