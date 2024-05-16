const Task = require("../../models/task");
const Comment = require("../../models/comment");

const dashboardIndex = (req, res) => {
  Task.find()
    .then((result) => {
      res.render("index", { tasks: result });
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

const dashboard_comment_post = (req, res) => {
  const comment = new Comment(req.body);
  comment
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

module.exports = {
  dashboardIndex,
  dashboard_task_post,
  dashboard_comment_post,
  task_delete,
};
