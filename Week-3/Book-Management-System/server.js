const express = require("express");
// Oluşturulan books.json dosyasının içeriğini okuyabilmek için fs modülünü import edildi
const fs = require("node:fs");

const app = express();
// Gelen istekleri JSON formnatında alıp görüntüleyebilmek adına JSON parse işlemi yapan Middleware oluşturuldu
app.use(express.json());


const filePath = "books.json";

// books.json dosyasının içeriğini okuma işlemini yapan metot
const readData = () => {
    // readFileSync metodu ile filePath değişkeninin içindeki books.json dosyasının içeriğinıin okuma işlemi gerçekleştirildi
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
};

const writeData = (books) => {
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
};

// Tüm Kitapları Listeleme (GET /books)
app.get("/books", (req, res) => {
    const data = readData();
    res.json(data);
});


// Yeni Kitap Ekleme (POST /books)
app.post("/books", (req, res) => {
    const newBook = req.body;
    let books = readData();
    books = [...books, newBook];
    writeData(books);
    res.json(books);
});




const PORT = 3001;
app.listen(PORT, () => { console.log(`Sunucu ${PORT} portunda çalışıyor...`); });