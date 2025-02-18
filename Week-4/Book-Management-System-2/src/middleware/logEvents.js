const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
  // date-fns paketinin içindeki format modülü ile o anki gümcel tarih oluşturuldu. \t -> bir tab'lık boşluk bırak demek
  const dateTime = format(new Date(), "dd.MM.yyyy\tHH.mm.ss");
  // dateTime -> yukarıda oluşturulan tarih. uuid -> uuid paketi ile oluşturtulan unique(benzersiz) bir id. message -> parametre'den gelen mesaj
  const logItem = `${dateTime}\t${uuid()}\t${message}`; //13.02.2025	23.01.12	e8a31fa8-cb92-4359-9abd-c6434590659b	POST	/submit	http://localhost:3000

  try {
    // fs paketi ile ve path paketi(dosya yolu bulma) yardımıyla bir klasör dış dizinde("..") logs klasörü var mı yok mu kontrol et yoksa sorgudan içeri gir
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      // bir klasör dışarıda mkdir metodu ile logs isminde klasör oluştur
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    // fs paketinin içindeki promises modülü yardımıyla appendFile metodu ile var olan dosyanın içine, al satıra veri yazma işlemi
    await fsPromises.appendFile(
      // bir klasör dışarıda logs klasörünün içinde parametreden gelen dosya ismi(logFileName)'ne sahip dosyanın içine virgülden sonarki logItem bilgisini yaz
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(err);
  }
};

// Request loglama middleware
const logger = (req, res, next) => {
  // log doyasının içinde yazacak mesajı burada tanımladık
  // req.method -> yapılan isteğin hangi metot ile yapıldığı. req.url -> isteğin hangi domain'den yapıldığı
  const message = `${req.method}\t${req.url}\t${req.headers.origin}`; // POST	/submit	http://localhost:3000
  // Yukarıdaki logEvents metoduna bir yukarıdaki mesajı(message) ve işlem yapılacak dosya ismini(reqLog.log) argüman olarak gönderdik
  logEvents(message, "reqLog.log");
  // bu metodu nerede çağırmış isek next ile oradaki bir sonraki kodları okumaya devam et
  next();
};

module.exports = { logEvents, logger };
