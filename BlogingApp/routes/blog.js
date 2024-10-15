const express = require("express");
const { createComment } = require("../controllers/comment");
const router = express.Router();

router.post("/comments/create",createComment)

module.exports = router