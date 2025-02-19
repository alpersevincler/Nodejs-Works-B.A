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
  try {
    const newBook = { id: Date.now(), ...req.body }; // Benzersiz ID oluştur
    Book.create(newBook);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message, status: "hello" });
  }
};

const updateBook = (req, res) => {
  try {
    const { id, email, age } = req.body;
    const updatedBook = Book.update(id, { email, age });
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
    Book.delete(bookId);
    res.status(204).send();
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
