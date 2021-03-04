const botonInformacion = document.getElementById('botonInformacion');
const botonReiniciar = document.getElementById('botonReiniciar');


       //CREANDO MATRIZ(GRILLA) Y DIBUJANDOLA EN EL TABLERO
const tablero = document.getElementById('tablero');
const grilla = [];

let animales = ["🦊","🐻","🦅","🦉","🐺"]; 
let nuevoArray = [];

let caja = '';

const getRandomInt = (min, max) =>{
    const posicion = Math.floor(Math.random() * animales.length);
    return animales[posicion];
 }
     
const generarMatriz = (filas) => {
    for (let i = 0; i < filas; i++){
        grilla[i]=[];
        for(let j = 0; j < filas; j++){
            grilla[i][j] = getRandomInt();
        }
    }
}
const dibujarTablero = (filas, level) => {
    for (let i = 0; i < filas; i++){
        for(let j = 0; j < filas; j++){
           tablero.innerHTML += `<div class="animales ${level}">${grilla[i][j]}</div>`;
        }
    }
}
  
          //DIFICULTAD DE JUEGO(CANTIDAD DE FILAS)
 const dificultad = (level) =>{
  let filas = 0;
  switch (level) {
      case 'facil':
          filas= 9;
          break;
      case 'normal':
          filas= 8 ;
           break;
      case 'dificil':
          filas= 7;
          break;
                      
      default:
          filas=9;
      }
generarMatriz(filas);
dibujarTablero(filas, level);
}


          //BIENVENIDA MODAL
const textoBienvenida = document.createElement('span');
textoBienvenida.innerHTML = "En MatcheADAs tu objetivo es juntar tres o más ítems del mismo tipo, ya sea en fila o columna. Para eso, selecciona un ítem y a continuación un ítem adyacente para intercambiarlos de lugar. <br /> <br /> Si se forma un grupo, esos ítems se eliminarán y ganarás puntos. ¡Sigue armando grupos de 3 o más antes de que se acabe el tiempo!<br /> <br /> <strong>Controles</strong> <br /> Click izquierdo: selección <br />Enter o Espacio: selección <br /> Flechas o WASD: movimiento e intercambio";
                                                                

const bienvenidaModal = (info) => {
    swal({
    title: "¡Bienvenida!",
    content: textoBienvenida,
    button: "A jugar!",
    closeOnClickOutside: false,
    closeOnEsc: false,
    }).then(() => {
        if(!info)
        dificultadJuego()
    })
};

        //ELEGIR DIFICULTAD DE JUEGO
const dificultadJuego = () => { 
    swal("Seleccione Dificultad",{
        buttons:{
           facil:"Fácil",
           normal: "Normal",
           dificil: "Difícil",
           closeOnClickOutside: false,
           closeOnEsc: false,
        }
    }).then((value) =>{
        switch (value){
            case "facil":
                dificultad('facil')    
                break;
                                        
            case "normal":
                dificultad('normal')
                break;
                                  
            case "dificil":
                dificultad('dificil')
                break;
                default:
            }
    })
};


          //REINICIAR JUEGO
const botonReinicio = () =>{
    swal({
        title: "¿Reiniciar Juego?",
        text: "¡Perderás todo tu puntaje acumulado!",
        buttons: {
            cancelar: "Cancelar", 
            nuevoJuego:  "Nuevo Juego"
      },
        closeOnClickOutside: false,
        closeOnEsc: false,
  })
    .then((value) =>{
        switch(value){
            case "cancelar":
                break;
            case "nuevoJuego":
                tablero.innerHTML = '';
                dificultadJuego(); 
                break;
                default:
        }
    })
}

            // APLICANDO EVENTO AL BOTON REINICIAR
botonReiniciar.addEventListener('click', botonReinicio);

       
            // APLICANDO EVENTO AL BOTON INFORMACION
botonInformacion.addEventListener('click', () => bienvenidaModal(true));



window.addEventListener('load', ()=>{
  bienvenidaModal(false);
});


    