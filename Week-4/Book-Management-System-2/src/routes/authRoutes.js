const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ilgili adrese post isteği geldiği anda controllers klasörü altındaki authController.js'in içindeki registerUser metodunu çalıştır
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

module.exports = router; 