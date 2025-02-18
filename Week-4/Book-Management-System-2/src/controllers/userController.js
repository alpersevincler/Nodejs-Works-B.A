const User = require("../models/User.js");
const path = require("path");
const fs = require("fs");

const getAllUsers = (req, res) => {
  try {
    // models klasörü altındaki User.js doyasının(User adında require ettik) içindeki finAll isimli metodu çalıştır ve oradan gelen cevabı book'a aktar
    const users = User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = (req, res) => {
  try {
    const newUser = { id: Date.now(), ...req.body }; // Benzersiz ID oluştur
    User.create(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = (req, res) => {
  try {
    const { id, email } = req.body;
    const updatedUser = User.update(id, { email });
    if (updatedUser) {
      res.json({ success: true, user: updatedUser });
    } else {
      res.status(404).json({ success: false, message: "Kullanıcı bulunamadı" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = (req, res) => {
  try {
    const { userId } = req.params;
    User.delete(userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Yeni register fonksiyonu
const registerUser = (req, res) => {
  try {
    // unique bir id oluşturduktan sonra devamına body'den glen bilgileri ekliyor ve bunu newUser'a atıyor
    const newUser = { id: Date.now(), ...req.body };
    // iki klasör dizini dışar çıkıp users.json isimli dosyayı seç
    const usersFilePath = path.join(__dirname, "..", "..", "users.json");
    // bir yukarıdaki usersFilePath doyasını json formatına parse et
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    // Email kontrolü
    const existingUser = users.find((user) => user.email === newUser.email);
    console.log("register = ", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "Bu email adresi zaten kayıtlı." });
    }
    // eğer email daha önce yok ise oluşan newUser objesini yukarıdaki users olarak tanımladığımız users.json dosyasının içine gönder
    users.push(newUser);
    // users değişkenini 2 satır boşluklu bir formatta yukarıda usersFilePath ismiyle tanımlanan users.json isimli dosyaya yaz
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Yeni login fonksiyonu
const loginUser = (req, res) => {
  try {
    const { email, password } = req.body;
    const usersFilePath = path.join(__dirname, "..", "..", "users.json");
    const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
    // Kullanıcı doğrulama
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return res.status(401).json({ message: "Geçersiz email veya şifre." });
    }
    res.status(200).json({ message: "Giriş başarılı!", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser
};
