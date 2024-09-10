const express = require('express');
const router = express.Router();

const {createTodo} = require("../controllers/create_todo");

router.post("/createTodo",createTodo);

module.exports = router;