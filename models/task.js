const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
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
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  notification: {
    type: Number,
    required: false,
  },
  users: [{type: Schema.Types.ObjectId, ref: "UserTasks"}]
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;