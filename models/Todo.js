const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = Schema(
  {
    content: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('todo', TodoSchema);
