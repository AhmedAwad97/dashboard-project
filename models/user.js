const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    "first-name": {
      type: String,
      required: true,
    },
    "last-name": {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    nationality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Date,
      defualt: Date.now(),
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema); //creat a model User using UserSchema
module.exports = User; //export the model to use in controller
