const express = require("express");
const router = express.Router();
const dashboardController = require("../../controller/dashboard/dashboardController");

router.get("/", dashboardController.dashboardIndex);
router.post("/", dashboardController.dashboard_creat_post);
router.delete("/:id", dashboardController.task_delete);
module.exports = router;
