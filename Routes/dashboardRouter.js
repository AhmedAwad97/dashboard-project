const express = require("express");
const router = express.Router();
const dashboardController = require("../controller/dashboardController");

router.get("/", (req, res) => {
  dashboardController.dashboardIndex(req, res, "/dashboard");
});
router.post("/tasks", dashboardController.dashboard_task_post);
router.post("/likes/:id", dashboardController.dashboard_like_post);
router.post("/comments/", dashboardController.dashboard_comment_post);
router.delete("/:id", dashboardController.task_delete);
module.exports = router;