const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tasksCompletedSchema = new Schema({
  task_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true
  },
});

const tasksCompleted = mongoose.model('TasksCompleted', tasksCompletedSchema);
module.exports = tasksCompleted;