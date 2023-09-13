class Mejora {
  constructor(nombre, precio, IDEdificio, tipo, requisito, bonus) {
    this.nombre = nombre;
    this.precio = precio;
    this.IDEdificio = IDEdificio;
    this.tipo = tipo;
    this.requisito = requisito;
    this.bonus = bonus;
    this.comprado = false;
  }
}

let dataMejoras = [
  [
    {
      nombre: "MejoraClick",
      precio: 100,
      IDEdificio: -1,
      tipo: "click",
      requisito: 100,
      bonus: 2,
    },
  ],
  [
    {
      nombre: "Mejora1 Ed1",
      precio: 100,
      IDEdificio: 0,
      tipo: "edificio",
      requisito: 10,
      bonus: 2,
    },
    {
      nombre: "Mejora2 Ed1",
      precio: 500,
      IDEdificio: 0,
      tipo: "edificio",
      requisito: 25,
      bonus: 2,
    },
  ],
  [
    {
      nombre: "Mejora1 Ed2",
      precio: 100,
      IDEdificio: 1,
      tipo: "edificio",
      requisito: 10,
      bonus: 2,
    },
  ],
];
