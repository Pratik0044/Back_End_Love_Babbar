const express = require('express');
const router = express.Router();
// Controller ko inmport karana
const {createTodo} = require("../controllers/create_todo");
const {getTodo, getTodoById} = require("../controllers/get_todo");
const {updateTodo} = require("../controllers/updat_todo")
const {deleteTodo} = require("../controllers/delete_todo")


// Controller ko route karana
router.post("/createTodo",createTodo);
router.get("/getTodos",getTodo);
router.get("/getTodos/:id",getTodoById)
router.put("/updateTodo/:id",updateTodo)
router.delete("/deleteTodo/:id",deleteTodo)

module.exports = router;