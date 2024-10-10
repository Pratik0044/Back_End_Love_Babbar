const express = require("express");
const router = express.Router();

const {dummyLink} = require("../controllers/dummy_controller")

router.get("/dummy",dummyLink);

module.exports = router