/*
Ödev 1: Modern JavaScript ile Basit Bir Uygulama Geliştirme

Aşağıdaki modern JavaScript özelliklerini kullanarak bir fonksiyon yazın:
- Template Literals (şablon dizgiler)
- Arrow Functions (ok fonksiyonları)
- Destructuring (parçalama ataması)
- Spread Operator (yayılma operatörü)
*/

// Arrow Functions (ok fonksiyonları)
const customerOrder = (order) => {
    // Destructuring (parçalama ataması)
    const { fullName, city, orderQuantity } = order;

    // Template Literals (şablon dizgiler)
    const notification = `Customer ${fullName} ordered ${orderQuantity} products from ${city}`;

    // Spread Operator (yayılma operatörü)
    const newOrder = { ...order, status: true };
    
    console.log("Notification = ", notification);
    console.log("newOrder = ", newOrder);

    return newOrder;
}

const orderInfo = {
    fullName: "Yılmaz Yıldırım",
    city: "Antalya",
    orderQuantity: 25
};

customerOrder(orderInfo);
/*
çıktı:
Notification =  Customer Yılmaz Yıldırım ordered 25 products from Antalya
newOrder =  {
  fullName: 'Yılmaz Yıldırım',
  city: 'Antalya',
  orderQuantity: 25,
  status: true
}
*/