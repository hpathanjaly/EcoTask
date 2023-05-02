const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTaskSchema = new Schema({
  task_id: {
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
  complete: {
    type: Boolean,
    required: true,
  },
  user: {type: Schema.Types.ObjectId, ref: "User"},
  task: {type: Schema.Types.ObjectId, ref: "Task"}
});

const UserTask = mongoose.model('UserTask', userTaskSchema);
module.exports = UserTask;