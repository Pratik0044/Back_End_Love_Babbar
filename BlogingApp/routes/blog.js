const express = require("express");
const { createComment } = require("../controllers/comment");
const { createPost, getPost } = require("../controllers/post");
const { createLike } = require("../controllers/like");
const router = express.Router();

router.post("/comments/create",createComment)

router.post("/posts/create",createPost)
router.get("/posts/get",getPost)
router.post("/likes/create",createLike)

module.exports = router