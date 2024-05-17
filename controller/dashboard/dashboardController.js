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

const dashboard_like_post = (req, res) => {
  const postId = req.params.id;
  Like.findOne({ postId })
    .then((like) => {
      if (like) {
        console.log("Like found" + like);
        return Like.deleteOne({ _id: like._id }).then(() => ({
          unliked: true,
        }));
      } else {
        const newLike = new Like({ postId });
        return newLike.save().then(() => ({ unliked: false }));
      }
    })
    .then((result) => res.json({ success: true, ...result }))
    .catch((err) => res.json({ success: false, error: err }));
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
