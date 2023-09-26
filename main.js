const spanMonedas = document.querySelector("#span-monedas");
const spanIngresos = document.querySelector("#span-ingresos");
const btnMoneda = document.querySelector("#btn-moneda");
const containerBtnEdificios = document.querySelector(
  ".container-btn-edificios"
);
const notificacionCompra = document.querySelector("#notificacion-compra");
const containerBtnMejoras = document.querySelector(".container-btn-mejoras");
const btnModalImportarPartida = document.querySelector(
  "#btn-modal-importar-partida"
);
const btnModalExportarPartida = document.querySelector(
  "#btn-modal-exportar-partida"
);
const btnBorrarPartida = document.querySelector("#btn-borrar-partida");
const modalImportarPartida = document.querySelector("#modal-importar-partida");
const modalExportarPartida = document.querySelector("#modal-exportar-partida");
const btnCerrarModalExportar = document.querySelector(
  "#btn-cerrar-modal-exportar"
);
const btnCerrarModalImportar = document.querySelector(
  "#btn-cerrar-modal-importar"
);
const textAreaExportarPartida = document.querySelector(
  "#textarea-exportar-partida"
);
const textAreaImportarPartida = document.querySelector(
  "#textarea-importar-partida"
);
const btnImportarPartida = document.querySelector("#btn-importar-partida");
const containerAnimacionMoneda = document.querySelector(
  ".container-animacion-moneda"
);
let btnEdificios;
let spanCantidadEdificios;
let spanCostoEdificios;
let btnMejoras;
let spanCostoMejoras;

let juego = {
  monedas: 0,
  poderClick: 1,
};

let edificios = [];
let mejoras = [];

let arrAudios = [];
let contadorAudio = 0;
for (let i = 0; i < 20; i++) {
  arrAudios.push(new Audio("./audio/pop3.mp3"));
}

function reproducirAudio() {
  arrAudios[contadorAudio].volume = 0.3;
  arrAudios[contadorAudio].play();
  if (contadorAudio >= 19) {
    contadorAudio = 0;
  } else {
    contadorAudio++;
  }
}

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

let timeOut;
function comprarEdificio(edificio) {
  if (juego.monedas >= edificio.precio) {
    juego.monedas -= edificio.precio;
    edificio.cantidad += 1;
    edificio.precio *= 1.15;
  } else {
    notificacionCompra.classList.remove("esconder-notificacion");
    notificacionCompra.classList.add("mostrar-notificacion");
    notificacionCompra.textContent = `Tenes ${juego.monedas.toFixed(
      2
    )} y el edificio cuesta ${edificio.precio.toFixed(2)}, te faltan ${(
      edificio.precio - juego.monedas
    ).toFixed(2)} monedas.`;

    function timeOutNotificacion() {
      if (timeOut) {
        clearTimeout(timeOut);
      }
      timeOut = setTimeout(function () {
        notificacionCompra.classList.add("esconder-notificacion");
        notificacionCompra.classList.remove("mostrar-notificacion");
        // notificacionCompra.style.display = "none";
      }, 3000);
    }
    timeOutNotificacion();
  }
}

let mejoras2 = [];

function cargarDataMejoras() {
  for (let i = 0; i < dataMejoras.length; i++) {
    for (let j = 0; j < dataMejoras[i].length; j++) {
      let { nombre, precio, IDEdificio, tipo, requisito, bonus } =
        dataMejoras[i][j];
      mejoras.push(
        new Mejora(nombre, precio, IDEdificio, tipo, requisito, bonus)
      );
    }
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
    if (mejora.IDEdificio < 0) {
      juego.poderClick *= mejora.bonus;
    } else {
      edificios[mejora.IDEdificio].ingresos *= mejora.bonus;
    }
    actualizarDisplay();
  } else {
    notificacionCompra.style.display = "block";
    notificacionCompra.textContent = `Tenes ${juego.monedas.toFixed(
      2
    )} y la mejora cuesta ${mejora.precio.toFixed(2)}, te faltan ${(
      mejora.precio - juego.monedas
    ).toFixed(2)} monedas.`;
    setTimeout(function () {
      notificacionCompra.style.display = "none";
    }, 3000);
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
        mejoras[i].IDEdificio >= 0 &&
        mejoras[i].requisito <= edificios[mejoras[i].IDEdificio].cantidad
      ) {
        btnMejoras[i].style.display = "inline";
      } else if (
        mejoras[i].IDEdificio < 0 &&
        mejoras[i].requisito <= juego.monedas
      ) {
        btnMejoras[i].style.display = "inline";
      }
    } else {
      btnMejoras[i].style.display = "none";
    }
  }
  spanMonedas.textContent = juego.monedas.toFixed(2);
  spanIngresos.textContent = `${(calcularIngresos100ms() * 10).toFixed(2)}/s`;
  document.querySelector(
    "title"
  ).textContent = `Monedas: ${juego.monedas.toFixed(0)}`;
}

btnMoneda.addEventListener("click", function () {
  juego.monedas += 1;
  actualizarDisplay();
  reproducirAudio();
  // animacionClickMoneda();
  animacionNumerosMoneda();
});

cargarDataEdificios();
cargarBotonesEdificios();
cargarDataMejoras();
cargarBotonesMejoras();

setInterval(function () {
  juego.monedas += calcularIngresos100ms() * 10;
  actualizarDisplay();
}, 1000);

function guardarPartida() {
  localStorage.setItem("juego", JSON.stringify({ juego, edificios, mejoras }));
  console.log(`La partida se guardo en: ${new Date()}`);
}

function borrarPartida() {
  localStorage.removeItem("juego");
}

function importarPartida(partida) {
  localStorage.setItem("juego", partida);
}

function exportarPartida() {
  return localStorage.juego;
}

function cargarPartida() {
  let partidaACargar = JSON.parse(localStorage.juego);
  juego = partidaACargar.juego;
  edificios = partidaACargar.edificios;
  mejoras = partidaACargar.mejoras;
}

setInterval(guardarPartida, 30000);

if (localStorage.juego) {
  cargarPartida();
}

document.addEventListener("keydown", function (evento) {
  if (evento.ctrlKey && evento.key == "s") {
    evento.preventDefault();
    guardarPartida();
  }
});

//MODALES IMPORTAR/EXPORTAR PARTIDA
btnModalExportarPartida.addEventListener("click", function () {
  modalExportarPartida.classList.remove("esconder-modal");
  textAreaExportarPartida.textContent = exportarPartida();
});

btnModalImportarPartida.addEventListener("click", function () {
  modalImportarPartida.classList.remove("esconder-modal");
});

btnCerrarModalExportar.addEventListener("click", function () {
  modalExportarPartida.classList.add("esconder-modal");
});

btnCerrarModalImportar.addEventListener("click", function () {
  modalImportarPartida.classList.add("esconder-modal");
});

btnImportarPartida.addEventListener("click", function () {
  let partidaACargar = textAreaImportarPartida.value;
  importarPartida(partidaACargar);
  location.reload();
});

btnBorrarPartida.addEventListener("click", function () {
  borrarPartida();
  location.reload();
});

//ANIMACION NUMEROS MONEDA
function animacionNumerosMoneda() {
  let posicionMoneda = btnMoneda.getBoundingClientRect();
  let posX = posicionMoneda.x;
  let posY = posicionMoneda.y;
  posX += Math.random() * 80 - 40;
  posY += Math.random() * 80 - 40;
  let elementoNumeroHTML = `<span><b>+${juego.poderClick}<b></span>`;
  let elementoNuevo = document.createElement("div");
  elementoNuevo.classList.add("contenedor-numero-moneda");
  elementoNuevo.classList.add("animacion-moneda");
  elementoNuevo.innerHTML = elementoNumeroHTML;
  elementoNuevo.style.position = "absolute";
  elementoNuevo.style.top = `${posY}px`;
  elementoNuevo.style.left = `${posX}px`;
  containerAnimacionMoneda.appendChild(elementoNuevo);

  setTimeout(function () {
    containerAnimacionMoneda.removeChild(containerAnimacionMoneda.firstChild);
  }, 1000);
}

// function animacionClickMoneda() {
//   let posicionMoneda = btnMoneda.getBoundingClientRect();
//   let posX = posicionMoneda.x;
//   let posY = posicionMoneda.y;

//   let elementoNumero = `<div class="numeros-animacion-moneda"><div class="numero-animacion-moneda" style="position:absolute;left:${posX}px;top:${posY}px;">+${juego.poderClick}</div></div>`;
// }
