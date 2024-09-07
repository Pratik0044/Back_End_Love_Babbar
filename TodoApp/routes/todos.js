const express = require('express');
const router = express.router();

const {createTodo} = require("../controllers/create_todo");

router.post("/createTodo",createTodo);

modules.exports = dbConnect;