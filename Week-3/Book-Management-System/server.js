const express = require("express");
// Oluşturulan books.json dosyasının içeriğini okuyabilmek için fs modülünü import edildi
const fs = require("node:fs");

const app = express();
// Gelen istekleri JSON formnatında alıp görüntüleyebilmek adına JSON parse işlemi yapan Middleware oluşturuldu
app.use(express.json());


const filePath = "books.json";

// books.json dosyasının içeriğini okuma işlemini yapan metot
const readData = () => {
   try {
    // readFileSync metodu ile filePath değişkeninin içindeki books.json dosyasının içeriğinin okuma işlemi gerçekleştirildi
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
   }catch(err) {
    console.error("JsonData read error = ", err);
    // Eğer dosyada kitap yoksa boş bir dizi dönecektir
    return [];
   }
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

    // Aynı başlığa sahip kitabın eklenip eklenmediğini kontrol edebilmek için find metodundan gelen cevap findTitle'a atandı
    const findTitle = books.find((book) => book.title == newBook.title);

    if(findTitle) {
        res.status(400).json({ Message: "Eklenmek istenen kitap zaten mevcut." })
    } else {
        books = [...books, newBook];
        writeData(books);
        res.json(books);
    }
});


// Kitap Bilgilerini Güncelleme (PUT /books/:id)
app.put("/books/:id", (req, res) => {
    const {id} = req.params;
    const {title, author, year, genre, pages} = req.body;

    let books = readData();

    const findBook = books.find( (book) => book.id === Number(id) );

    if(findBook) {
        books = books.map((book) => {
            if( book.id === Number(id) ) {
                return {...book, title, author, year, genre, pages}
            }
            return book;
        });
        writeData(books);
        res.json({ success: true, books });
    } else {
        res.status(404).json({ Message: "Kitap bulunamadı" });
    }
});


app.delete("/books/:id", (req, res) => {
    const {id} = req.params;

    let books = readData();

    // Belirtilen id'nin varlığını kontrol edebilmek için find metodundan gelen cevap findDeleteBook'a atandı
    const findDeleteBook = books.find((book) => book.id === Number(id));

    if(findDeleteBook) {
        books = books.filter( (book) => book.id !== Number(id) );
        writeData(books);
        res.status(204).json(books);
    } else {
        res.status(404).json(books);
    }
    
});



const PORT = 3001;
app.listen(PORT, () => { console.log(`Sunucu ${PORT} portunda çalışıyor...`); });