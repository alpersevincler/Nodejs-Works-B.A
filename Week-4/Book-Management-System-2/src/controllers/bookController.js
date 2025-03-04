const Book = require("../models/Book.js");
const path = require("path");
const fs = require("fs");

const getAllBooks = (req, res) => {
  try {
    // models klasörü altındaki User.js doyasının(User adında require ettik) içindeki findAll isimli metodu çalıştır ve oradan gelen cevabı book'a aktar 
    const books = Book.findAll();
    console.log("bookController getAllBooks books = ", books);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBook = (req, res) => {
  
  const newBook = { id: Date.now(), ...req.body };
  const findBookTitle = Book.create(newBook);

  console.log("findTitle = ", findBookTitle);
  if(!findBookTitle) {
    res.status(400).json({ Message: "Eklenmek istenen kitap zaten mevcut." });
  } else {
    res.status(201).json(newBook);
  }
  
};

const updateBook = (req, res) => {
  try {
    const {bookId} = req.params;
    const {title, author, year, genre, pages} = req.body;
    const updatedBook = Book.update(bookId, { title, author, year, genre, pages });
    console.log("updateBook updatedBook = ", updatedBook);
    if (updatedBook) {
      res.json({ success: true, book: updatedBook });
    } else {
      res.status(404).json({ success: false, message: "Kitap bulunamadı" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = (req, res) => {
  try {
    const { bookId } = req.params;
    const deleteBook = Book.delete(bookId);
    if(deleteBook) {
      res.status(200).json({ Message: "Kitap başarıyla silindi !" });
    }else {
      res.status(404).json({ Message: "Silinmek istenen kitap bulunamadı !" });
    }
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
