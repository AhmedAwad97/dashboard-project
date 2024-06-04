const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId, //references the _id in the User model
      required: true,
    },
    "first-name": {
      type: String,
    },
    "last-name": {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    passwordUpdatedAt: {
      type: Date,
      default: function () {
        const now = new Date();
        return new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes()
        );
      },
    },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("user-info", UserInfoSchema);
module.exports = UserInfo;
