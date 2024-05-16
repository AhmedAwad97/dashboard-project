const Task = require("../../models/task");

const dashboardIndex = (req, res) => {
  Task.find()
    .then((result) => {
      res.render("index", { tasks: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const dashboard_creat_post = (req, res) => {
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
      res.json({ redirect: "/dashboard" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  dashboardIndex,
  dashboard_creat_post,
  task_delete,
};
