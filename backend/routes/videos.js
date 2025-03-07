const express = require('express');
const router = express.Router();
const {uploadVideo} = require(`../controllers/videosController`);
const authenticateToken = require('../middleware/auth');
const multer = require('multer');

//Confugre mutler to store uploaded files temporariliy
const upload = multer({ dest: `uploads/`});

router.post('/upload', authenticateToken, upload.single('video'), uploadVideo);

module.exports = router;
