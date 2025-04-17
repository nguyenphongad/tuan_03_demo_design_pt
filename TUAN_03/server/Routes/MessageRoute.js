const express  = require("express");
const { addMessage, getMessage } = require("../Controller/MessageController");

const router  =express.Router();

router.post("/", addMessage);
router.get("/:chatId", getMessage)

module.exports = router