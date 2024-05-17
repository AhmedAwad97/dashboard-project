const Task = require("../../models/task");
const Comment = require("../../models/comment");
const Like = require("../../models/like");
const Post = require("../../models/post");

const dashboardIndex = (req, res) => {
  Promise.all([Task.find(), Post.find(), Like.find()])
    .then((result) => {
      const [tasks, posts, likes] = result;
      res.render("index", { tasks, posts });
    })
    .catch((err) => {
      console.log(err);
    });
};

const dashboard_task_post = (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((result) => res.redirect("/dashboard"))
    .catch((err) => {
      console.log(err);
    });
};

const task_delete = (req, res) => {
  const id = req.params.id;
  Task.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const dashboard_like_post = async (req, res) => {
  try {
    const postId = await req.params.id;

    let like = await Like.findOne({ postId });
    let updatedPost;

    if (like) {
      //decrement the like count
      updatedPost = await Post.findByIdAndUpdate(postId, {
        $inc: { likeCount: -1 },
      });
      await Like.deleteOne({ _id: like._id });
      res.json({
        success: true,
        unliked: true,
        likeCount: updatedPost.likeCount,
      });
    } else {
      const newLike = new Like({ postId });
      updatedPost = await Post.findByIdAndUpdate(postId, {
        $inc: { likeCount: 1 },
      });
      await newLike.save();
      res.json({
        success: true,
        unliked: false,
        likeCount: updatedPost.likeCount,
      });
    }
  } catch (err) {
    res.json({ success: false, error: err });
  }
};

const dashboard_comment_post = async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const result = await comment.save();
    await Post.findByIdAndUpdate(req.body.postId, {
      $inc: { commentCount: 1 },
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  dashboardIndex,
  dashboard_task_post,
  task_delete,
  dashboard_like_post,
  dashboard_comment_post,
};
