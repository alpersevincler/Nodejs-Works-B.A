const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});

// İşlem sırası: server.js -> app.js -> routes/userRoutes.js -> controllers/userController -> models/User.js