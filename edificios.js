class Edificio {
  constructor(nombre, precio, ingresos, ID) {
    this.nombre = nombre;
    this.precio = precio;
    this.ingresos = ingresos;
    this.cantidad = 0;
    this.ID = ID;
  }
}

let dataEdificios = [
  { nombre: "NUEVO", precio: 1, ingresos: 100 },
  { nombre: "edificio1", precio: 15, ingresos: 1 },
  { nombre: "edificio2", precio: 50, ingresos: 3 },
  { nombre: "edificio3", precio: 150, ingresos: 10 },
  { nombre: "edificio4", precio: 500, ingresos: 30 },
  { nombre: "edificio5", precio: 1500, ingresos: 100 },
  { nombre: "edificio5", precio: 3000, ingresos: 200 },
];
