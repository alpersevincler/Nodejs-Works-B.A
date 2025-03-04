const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// ilgili adrese get isteği geldiği anda controllers klasörü altındaki bookController.js'in içindeki getAllBooks metodunu çalıştır
router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.put('/:bookId', bookController.updateBook);
router.delete('/:bookId', bookController.deleteBook);



module.exports = router; 