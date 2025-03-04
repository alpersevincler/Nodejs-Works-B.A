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

  create(newBook) {
    const books = this.readData();
    
    const findBook = books.find((book) => book.title == newBook.title);

    if(findBook) {
      return false;
    }

    books.push(newBook);
    this.writeData(books);
    return newBook;
  }

  update(id, updatedData) {
    const books = this.readData();
    console.log("update books = ", books);
    console.log("update id = ", id);

    const findBook = books.find( (book) => book.id === Number(id) );
    console.log("update findBook = ", findBook);

    if(findBook) {
      const updatedBooks = books.map((book) =>
      book.id === Number(id) ? { ...book, ...updatedData } : book );
      this.writeData(updatedBooks);
      return updatedBooks;
    }
    return false;
    // return this.findById(id);
  }

  delete(bookId) {
    const books = this.readData();
    const findDeleteBook = books.find((book) => book.id === Number(bookId));

    if(findDeleteBook) {
      const filteredBooks = books.filter((book) => book.id !== Number(bookId));
      this.writeData(filteredBooks);
      return true;
    }
    return false;
  }
}

module.exports = new Book();
