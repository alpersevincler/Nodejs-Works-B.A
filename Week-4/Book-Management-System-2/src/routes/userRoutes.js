const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// ilgili adrese get isteği geldiği anda controllers klasörü altındaki userController.js'in içindeki getAllUsers metodunu çalıştır
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);

module.exports = router; 