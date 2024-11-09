const express = require('express');
const router = express.Router();

const {localFileUpload} = require('../controllers/FileUpload')

router.post('/localFileUpload', localFileUpload);

module.exports = router;