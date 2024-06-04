const Task = require("../models/task");
const Comment = require("../models/comment");
const Like = require("../models/like");
const Post = require("../models/post");

const dashboardIndex = async (req, res, currentPath) => {
  try {
    const [tasks, posts, likes] = await Promise.all([
      Task.find(),
      Post.find(),
      Like.find(),
    ]);

    const userLikes = {}; //empty object will contain all id of posts that been liked
    likes.forEach((like) => {
      userLikes[like.postId] = true;
    });

    //render the index page and pass the data in the object to be used in index.ejs
    res.render("index", {
      title: "Dashboard",
      tasks,
      posts,
      userLikes,
      currentPath,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//function hanlde the saved tasks
const dashboard_task_post = (req, res) => {
  //save a new record in tasks collection using Task model
  const task = new Task(req.body);
  task
    .save()
    .then((result) => res.redirect("/dashboard"))
    .catch((err) => {
      console.log(err);
    });
};

//handle deleting the task from db
const task_delete = (req, res) => {
  const id = req.params.id; //get the id of the task from the req.params.id that will be passed like "/task/:id"
  Task.findByIdAndDelete(id) //find the task by the id and if found, delete it from the db
    .then((result) => {
      if (result) {
        res.json({ success: true }); //send json respond with {success:true} to the client
      } else {
        res.json({ success: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    });
};

const dashboard_like_post = async (req, res) => {
  try {
    const postId = await req.params.id; //get the post id which just been liked/unliked

    let like = await Like.findOne({ postId }); //check if the like exists with the post id
    let updatedPost;

    if (like) {
      //decrement the like count
      await Like.deleteOne({ _id: like._id });
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { likeCount: -1 },
        },
        { new: true }
      );
      res.json({
        success: true,
        unliked: true,
        likeCount: updatedPost.likeCount,
      });
    } else {
      //if the post not liked, creat a new record in likes and save it, increase the like counter by one
      const newLike = new Like({ postId });
      await newLike.save();
      updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          $inc: { likeCount: 1 },
        },
        { new: true }
      );
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

//save te comment in the db
const dashboard_comment_post = async (req, res) => {
  // save a new model of the Comment and take the value from the req.url
  const comment = new Comment(req.body);
  try {
    const result = await comment.save(); //save a new data record in the comments collection
    await Post.findByIdAndUpdate(req.body.postId, {
      $inc: { commentCount: 1 }, // if the post with the id = postId exists, increment the commentcount by one
    });
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//export the module to be used in the router file
module.exports = {
  dashboardIndex,
  dashboard_task_post,
  task_delete,
  dashboard_like_post,
  dashboard_comment_post,
};
