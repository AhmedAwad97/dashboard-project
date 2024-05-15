const express = require("express");
const router = express.Router();
const dashboardController = require("../../controller/dashboard/dashboardController");

router.get("/", dashboardController.dashboardIndex);
module.exports = router;
