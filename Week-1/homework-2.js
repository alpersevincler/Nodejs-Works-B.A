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