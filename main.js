const spanMonedas = document.querySelector("#span-monedas");
const spanIngresos = document.querySelector("#span-ingresos");
const btnMoneda = document.querySelector("#btn-moneda");
const containerBtnEdificios = document.querySelector(
  ".container-btn-edificios"
);
const containerBtnMejoras = document.querySelector(".container-btn-mejoras");
let btnEdificios;
let spanCantidadEdificios;
let spanCostoEdificios;
let btnMejoras;
let spanCostoMejoras;

let juego = {
  monedas: 0,
};

let edificios = [];
let mejoras = [];

function cargarDataEdificios() {
  for (let i = 0; i < dataEdificios.length; i++) {
    let { nombre, precio, ingresos } = dataEdificios[i];
    edificios.push(new Edificio(nombre, precio, ingresos, i));
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
    edificio.precio *= 1.15;
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

function cargarDataMejoras() {
  for (let i = 0; i < dataMejoras.length; i++) {
    let arrObjetos = [];
    for (let j = 0; j < dataMejoras[i].length; j++) {
      let { nombre, precio, IDEdificio, tipo, requisito, bonus } =
        dataMejoras[i][j];
      mejoras.push(
        new Mejora(nombre, precio, IDEdificio, tipo, requisito, bonus)
      );
    }
    // mejoras.push(arrObjetos);
  }
}

function cargarBotonesMejoras() {
  for (let i = 0; i < mejoras.length; i++) {
    containerBtnMejoras.innerHTML += `<button style="display: none;" class="btn btn-danger btn-mejoras">
      ${mejoras[i].nombre} Costo: <span class="span-costo-mejoras">${mejoras[i].precio}</span> 
    </button>`;
  }

  btnMejoras = document.querySelectorAll(".btn-mejoras");
  spanCostoMejoras = document.querySelectorAll(".span-costo-mejoras");

  for (let i = 0; i < btnMejoras.length; i++) {
    btnMejoras[i].addEventListener("click", function () {
      comprarMejora(mejoras[i]);
      actualizarDisplay();
    });
  }
}

function comprarMejora(mejora) {
  if (juego.monedas >= mejora.precio) {
    juego.monedas -= mejora.precio;
    mejora.comprado = true;
    edificios[mejora.IDEdificio].ingresos *= 2;
    actualizarDisplay();
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
    spanCostoEdificios[i].textContent = Math.ceil(edificios[i].precio);
  }
  for (let i = 0; i < btnMejoras.length; i++) {
    if (!mejoras[i].comprado) {
      if (
        mejoras[i].tipo === "edificio" &&
        mejoras[i].requisito <= edificios[mejoras[i].IDEdificio].cantidad
      ) {
        btnMejoras[i].style.display = "inline";
      }
    } else {
      btnMejoras[i].style.display = "none";
    }
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
cargarDataMejoras();
cargarBotonesMejoras();

setInterval(function () {
  juego.monedas += calcularIngresos100ms();
  actualizarDisplay();
}, 100);
