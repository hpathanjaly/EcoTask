const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  tasks: [{type: Schema.Types.ObjectId, ref: "UserTasks"}],
  investments: [{type: Schema.Types.ObjectId, ref: "UserTasks"}]
});

const User = mongoose.model('User', userSchema);
module.exports = User;