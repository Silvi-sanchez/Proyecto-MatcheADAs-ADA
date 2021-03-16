const botonInformacion = document.getElementById("botonInformacion");
const botonReiniciar = document.getElementById("botonReiniciar");
const tiempoRestante = document.getElementById("tiempoRestante");
let paused = false;
let tiempo;
let filas = 0;
let _level;

        //CREANDO MATRIZ(GRILLA) Y DIBUJANDOLA EN EL TABLERO
const tablero = document.getElementById("tablero");
const grilla = [];

let animales = ["🦊", "🐻", "🦅", "🦉", "🐺"];

let caja = "";

const getRandomInt = (min, max) => {
  const posicion = Math.floor(Math.random() * animales.length);
  return animales[posicion];
};

const generarMatriz = (filas) => {
  for (let i = 0; i < filas; i++) {
    grilla[i] = [];
    for (let j = 0; j < filas; j++) {
      grilla[i][j] = getRandomInt();
    }
  }
};
const dibujarTablero = (filas, level) => {
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j < filas; j++) {
      tablero.innerHTML += `<div class="animales ${level}">${grilla[i][j]}</div>`;
    }
  }
};

        //DIFICULTAD DE JUEGO(CANTIDAD DE FILAS)
const dificultad = (level) => {
  _level = level;
  switch (level) {
    case "facil":
      filas = 9;
      break;
    case "normal":
      filas = 8;
      break;
    case "dificil":
      filas = 7;
      break;
    default:
      filas = 9;
  }
  generarMatriz(filas);
  dibujarTablero(filas, level);
};

        //BIENVENIDA MODAL
const textoBienvenida = document.createElement("span");
textoBienvenida.innerHTML =
  "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. <br /> <br /> Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!<br /> <br /> <strong>Controles</strong> <br /> Click izquierdo: selección <br />Enter o Espacio: selección <br /> Flechas o WASD: movimiento e intercambio";

const bienvenidaModal = (info) => {
  paused = true;
  swal({
    title: "¡Bienvenida!",
    content: textoBienvenida,
    button: "A jugar!",
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then(() => {
    if (!info) dificultadJuego();
    else paused = false;
  });
};

        //ELEGIR DIFICULTAD DE JUEGO
const dificultadJuego = () => {
  swal("Seleccione Dificultad", {
    buttons: {
      facil: "Fácil",
      normal: "Normal",
      dificil: "Difícil",
      closeOnClickOutside: false,
      closeOnEsc: false,
    },
  }).then((value) => {
    contadorInicializacion();
    switch (value) {
      case "facil":
        dificultad("facil");
        break;

      case "normal":
        dificultad("normal");
        break;

      case "dificil":
        dificultad("dificil");
        break;
      default:
    }
  });
};

        //REINICIAR JUEGO
const botonReinicio = () => {
  paused = true;
  swal({
    title: "¿Reiniciar Juego?",
    text: "¡Perderás todo tu puntaje acumulado!",
    buttons: {
      cancelar: "Cancelar",
      nuevoJuego: "Nuevo Juego",
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "cancelar":
        paused = false;
        break;
      case "nuevoJuego":
        tablero.innerHTML = "";
        clearInterval(tiempo);
        dificultadJuego();
        break;
      default:
    }
  });
};

        // APLICANDO EVENTO AL BOTON REINICIAR
botonReiniciar.addEventListener("click", botonReinicio);

        // APLICANDO EVENTO AL BOTON INFORMACION
botonInformacion.addEventListener("click", () => bienvenidaModal(true));

        //AL CARGAR LA PAGINA SE MUESTRAN AMBOS MODALES(BIENVENIDA E INFO)
window.addEventListener("load", () => {
  bienvenidaModal(false);
});

        // FUNCION TEMPORIZADOR
function contadorInicializacion() {
  paused = false;
  let n = 30;
  tiempoRestante.innerHTML = "0:" + n.toString().padStart(2, "0");
  n--;
  tiempo = window.setInterval(function () {
    if (!paused) {
      tiempoRestante.innerHTML = "0:" + n.toString().padStart(2, "0");
      n--;
      if (n < 0) {
        modalTemporizador();
      }
    }
  }, 1000);
}

        // MODAL TEMPORIZADOR
const modalTemporizador = () => {
  tablero.innerHTML = "";
  clearInterval(tiempo);
  swal({
    title: "¡Juego terminado!",
    text: `Puntaje final: `,
    buttons: {
      nuevoJuego: {
        text: "Nuevo Juego",
        value: "nuevoJuego",
      },
      reiniciar: {
        text: "Reiniciar",
        value: "reiniciar",
      },
    },
    closeOnClickOutside: false,
    closeOnEsc: false,
  }).then((value) => {
    switch (value) {
      case "nuevoJuego":
        dificultadJuego();
        break;
      case "reiniciar":
        contadorInicializacion();
        generarMatriz(filas);
        dibujarTablero(filas, _level);
        break;
      default:
    }
  });
};
    