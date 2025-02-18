const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  // Hatayı logla
  const errorMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  // hata için oluşturduğumuz yukarıdaki mesajı(errorMessage) ve bunların içine yazılacak error log dosya ismini("errLog.log") 
  //  -aynı klasör içindeki logEvents dosyasını içindeki logEvents metoduna argüman olarak gönderdik
  logEvents(errorMessage, "errLog.log");

  console.error(err.stack);
  // Burada bir hata yakalanmış olacağından eğer gelen status kodu 200 ise bunu 500 yap, eğer 200 değilse var olan status kodu gönder olarak bir status tanımlaması yapıldı
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
