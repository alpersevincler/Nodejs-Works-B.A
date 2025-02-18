const User = require("../models/User.js");
const path = require("path");
const fs = require("fs");


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
  registerUser,
  loginUser
};
