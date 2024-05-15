const { Timestamp } = require("bson");
const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    paragraph: {
      type: string,
      required: true,
    },
  },
  { Timestamp: true }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
