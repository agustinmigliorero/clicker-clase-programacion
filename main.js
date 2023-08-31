const spanMonedas = document.querySelector("#span-monedas");
const spanIngresos = document.querySelector("#span-ingresos");
const btnMoneda = document.querySelector("#btn-moneda");
const btnEdificios = document.querySelectorAll(".btn-edificios");
const spanEdificios = document.querySelectorAll(".span-edificios");

let juego = {
  monedas: 0,
};

let edificios = [
  { nombre: "edificio1", precio: 15, ingresos: 1, cantidad: 0 },
  { nombre: "edificio2", precio: 50, ingresos: 3, cantidad: 0 },
  { nombre: "edificio3", precio: 150, ingresos: 10, cantidad: 0 },
  { nombre: "edificio4", precio: 500, ingresos: 30, cantidad: 0 },
  { nombre: "edificio5", precio: 1000, ingresos: 100, cantidad: 0 },
];

function comprarEdificio(edificio) {
  if (juego.monedas >= edificio.precio) {
    juego.monedas -= edificio.precio;
    edificio.cantidad += 1;
  } else {
    alert(
      `Tenes ${juego.monedas.toFixed(
        2
      )} y el edificio cuesta ${edificio.precio.toFixed(2)}, te faltan ${(
        edificio.precio - juego.monedas
      ).toFixed(2)} monedas.`
    );
  }
}

function calcularIngresos100ms() {
  let ingresos = 0;
  for (let i = 0; i < edificios.length; i++) {
    ingresos += (edificios[i].cantidad * edificios[i].ingresos) / 10;
  }
  return ingresos;
}

function actualizarDisplay() {
  for (let i = 0; i < spanEdificios.length; i++) {
    spanEdificios[i].textContent = edificios[i].cantidad;
  }
  spanMonedas.textContent = juego.monedas.toFixed(2);
  spanIngresos.textContent = `${(calcularIngresos100ms() * 10).toFixed(2)}/s`;
}

btnMoneda.addEventListener("click", function () {
  juego.monedas += 1;
  actualizarDisplay();
});

for (let i = 0; i < btnEdificios.length; i++) {
  btnEdificios[i].addEventListener("click", function () {
    comprarEdificio(edificios[i]);
    actualizarDisplay();
  });
}

setInterval(function () {
  juego.monedas += calcularIngresos100ms();
  actualizarDisplay();
}, 100);
