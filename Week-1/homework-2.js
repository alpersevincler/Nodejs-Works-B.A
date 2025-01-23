const customers = [
    { id: 1, name: "Ahmet", age: 32, city: "Ankara", orders: [100, 200, 150] },
    { id: 2, name: "Ayşe", age: 27, city: "İstanbul", orders: [300, 50] },
    { id: 3, name: "Mehmet", age: 40, city: "İzmir", orders: [500, 100, 200] },
    { id: 4, name: "Fatma", age: 35, city: "Ankara", orders: [300] },
    { id: 5, name: "Zeynep", age: 28, city: "Bursa", orders: [] }
  ];

const istanbulUsers = customers.filter(user => user.city === "İstanbul").map(user => user.name);
console.log(istanbulUsers);
