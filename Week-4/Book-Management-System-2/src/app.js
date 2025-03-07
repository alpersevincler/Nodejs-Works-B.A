const express = require('express');
const cors = require('cors');
const path = require('path');
const corsOptions = require('./config/corsConfig');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Yapılan istekleri log'layan middleware 
app.use(logger);

// Routes
app.use('/api/books', bookRoutes);
// app.use('/api/users', userRoutes);
app.use("/api/auth", authRoutes);

// Static dosyalar
app.use(express.static(path.join(__dirname, 'views')));

// Form route'u
app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Hata yakalama
// Yukarıdakilerde hata alırsak bunu yakalayacağız ama alt satırlarda hata varsa bunu yakalayamayacağımızdan bu middleware'i en alt satıra yazdık
app.use(errorHandler);

module.exports = app; 