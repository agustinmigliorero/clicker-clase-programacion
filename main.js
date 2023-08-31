const spanMonedas = document.querySelector("#span-monedas");
const spanIngresos = document.querySelector("#span-ingresos");
const btnMoneda = document.querySelector("#btn-moneda");
const containerBtnEdificios = document.querySelector(
  ".container-btn-edificios"
);
let btnEdificios;
let spanCantidadEdificios;
let spanCostoEdificios;

let juego = {
  monedas: 0,
};

let edificios = [];

function cargarDataEdificios() {
  for (let i = 0; i < dataEdificios.length; i++) {
    let { nombre, precio, ingresos } = dataEdificios[i];
    edificios.push(new Edificio(nombre, precio, ingresos));
  }
}

function cargarBotonesEdificios() {
  for (let i = 0; i < edificios.length; i++) {
    containerBtnEdificios.innerHTML += `<button class="btn btn-danger btn-edificios">
      ${edificios[i].nombre} Costo: <span class="span-costo-edificios">${edificios[i].precio}</span> Cantidad: <span class="span-cantidad-edificios">${edificios[i].cantidad}</span>
    </button>`;
  }

  btnEdificios = document.querySelectorAll(".btn-edificios");
  spanCostoEdificios = document.querySelectorAll(".span-costo-edificios");
  spanCantidadEdificios = document.querySelectorAll(".span-cantidad-edificios");

  for (let i = 0; i < btnEdificios.length; i++) {
    btnEdificios[i].addEventListener("click", function () {
      comprarEdificio(edificios[i]);
      actualizarDisplay();
    });
  }
}

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
  for (let i = 0; i < spanCostoEdificios.length; i++) {
    spanCostoEdificios[i].textContent = edificios[i].precio;
    spanCantidadEdificios[i].textContent = edificios[i].cantidad;
  }
  spanMonedas.textContent = juego.monedas.toFixed(2);
  spanIngresos.textContent = `${(calcularIngresos100ms() * 10).toFixed(2)}/s`;
}

btnMoneda.addEventListener("click", function () {
  juego.monedas += 1;
  actualizarDisplay();
});

cargarDataEdificios();
cargarBotonesEdificios();

setInterval(function () {
  juego.monedas += calcularIngresos100ms();
  actualizarDisplay();
}, 100);
