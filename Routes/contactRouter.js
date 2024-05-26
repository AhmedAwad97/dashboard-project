const express = require("express");
const router = express.Router();
const contactController = require("../controller/contactController");

router.get("/", contactController.contact_index);
router.post("/submit", contactController.contact_form_post);

module.exports = router;
