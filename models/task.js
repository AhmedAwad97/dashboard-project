const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { Timestamps: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;