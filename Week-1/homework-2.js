/*
Ödev 2: Customers Array
Aşağıdaki müşteri listesini kullanarak soruları çözmeye çalışın. İstenen çıktıları belirttim. Kendi kodunuzu yazıp çalıştırarak öğrenmeye çalışın.
*/

const customers = [
  { id: 1, name: "Ahmet", age: 32, city: "Ankara", orders: [100, 200, 150] },
  { id: 2, name: "Ayşe", age: 27, city: "İstanbul", orders: [300, 50] },
  { id: 3, name: "Mehmet", age: 40, city: "İzmir", orders: [500, 100, 200] },
  { id: 4, name: "Fatma", age: 35, city: "Ankara", orders: [300] },
  { id: 5, name: "Zeynep", age: 28, city: "Bursa", orders: [] }
];


// ---Kolay Soru: İstanbul'da yaşayan müşterilerin isimlerini bir dizi olarak döndür.

const istanbulUsers = customers.filter(user => user.city === "İstanbul").map(user => user.name);
console.log(istanbulUsers); //çıktı: [ 'Ayşe' ]


// ---Orta Soru: Siparişleri toplamda 300 TL’den fazla olan ilk müşterinin adını döndür.

const totalOrder300 = customers.find((user) => {
  const totalOrder = user.orders.reduce((total, order) => total + order, 0);
  return totalOrder > 300;
}).name;

console.log(totalOrder300); //çıktı: Ahmet


// ---Zor Soru: Şehir bazında toplam sipariş miktarlarını döndür.

const cityOrdersTotals = customers.reduce((acc, user) => {
  acc[user.city] = (acc[user.city] || 0) + ( user.orders.reduce((total, order)  => total + order, 0) ); 
  return acc
}, {});

console.log(cityOrdersTotals); //çıktı: { Ankara: 750, 'İstanbul': 350, 'İzmir': 800, Bursa: 0 }


// ---Çok Zor Soru: Her müşterinin toplam sipariş miktarını ve yaşını bir string olarak şu formatta döndür: Ahmet (32): 450 TL

const userAgeTotalOrders = customers.map((user) => {
  const userTotalOrders = user.orders.reduce((acc, order) => acc + order, 0);
  return `${user.name} (${user.age}): ${userTotalOrders} TL`;
});

console.log("userAgeTotalOrders = ", userAgeTotalOrders);
/*
çıktı:
userAgeTotalOrders =  [
  'Ahmet (32): 450 TL',
  'Ayşe (27): 350 TL',
  'Mehmet (40): 800 TL',
  'Fatma (35): 300 TL',
  'Zeynep (28): 0 TL'
]
*/


// ---Çok Çok Zor Soru: Tüm müşterilerin siparişlerini en yüksekten en düşüğe sıralayıp tek bir dizi olarak döndür.

// flat metodu orders dizilerinin içindeki elemanları tek bir dizi şeklinde toplayacaktır
const orderSorting = customers.map((user) => user.orders).flat().sort((a, b) => {return b - a});

console.log("orderSorting = ", orderSorting); //çıktı: orderSorting =  [500, 300, 300, 200, 200, 150, 100, 100, 50]
