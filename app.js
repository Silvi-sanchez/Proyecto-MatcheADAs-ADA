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
