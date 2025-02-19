const fs = require('fs');
const path = require('path');

class Book {
  constructor() {
    // books.json dosyasındaki verileri oku
    this.filePath = path.join(__dirname, '..', '..', 'books.json');
  }

  readData() {
    // yukarıdaki constructor()'ın içerisindeki this.filePath ile tanımlanmış dosyayı oku
    const jsonData = fs.readFileSync(this.filePath);
    console.log("Book.js readData jsonData = ", jsonData);
    // okunan dosyayı geri döndür
    return JSON.parse(jsonData);
  }

  writeData(books) {
    fs.writeFileSync(this.filePath, JSON.stringify(books, null, 2));
  }

  findAll() {
    console.log("Book.js findAll = ");
    return this.readData();
  }

  findById(id) {
    return this.readData().find((book) => book.id === Number(id));
  }

  create(book) {
    const books = this.readData();
    books.push(book);
    this.writeData(books);
    return book;
  }

  update(id, updatedData) {
    const books = this.readData();
    const updatedBooks = books.map((book) =>
      book.id === Number(id) ? { ...book, ...updatedData } : book
    );
    this.writeData(updatedBooks);
    return this.findById(id);
  }

  delete(id) {
    const books = this.readData();
    const filteredBooks = users.filter((book) => book.id !== Number(id));
    this.writeData(filteredBooks);
    return true;
  }
}

module.exports = new Book();
