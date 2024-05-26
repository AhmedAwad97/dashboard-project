const express = require("express");
const router = express.Router();
const settingsController = require("../controller/settingsController");

router.get("/", settingsController.settings_index);
router.post("/general-info", settingsController.settings_Gen_Info_post);
router.post("/security-info", settingsController.settings_Secu_info_post);
module.exports = router;
