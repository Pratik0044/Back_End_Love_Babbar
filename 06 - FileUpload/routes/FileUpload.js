const express = require('express');
const router = express.Router();

const {loaclFileUpload} = require('../controllers/FileUpload')

router.post('/loaclFileUpload', loaclFileUpload);

module.exports = router;