const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    likeCounter: {
      type: NUMBER,
      required: true,
    },
    comment: {
      type: string,
      required: true,
    },
  },
  { Timestamp: true }
);

const Post = mongoose.model("post", postSchema);

module.exports = Post;
