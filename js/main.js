// ** ELEMENTOS DEL DOM Y VARIABLES GLOBALES **

// pantallas
const splashScreenNode = document.querySelector("#splash-screen");
const gameScreenNode = document.querySelector("#game-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const resultsScreenNode = document.querySelector("#results-screen");

// botones
const startBtnNode = document.querySelector("#start-btn");
const reStartBtnNodeGameOver = document.querySelector("#reStart-gameOver");
const reStartBtnNodeResuls = document.querySelector("#reStart-results");

// game box
const gameboxNode = document.querySelector("#game-box");

// progress bar
const progressBarNode = document.querySelector("progress");

// score
const scoreNode = document.querySelector("#score");

// final score
const finalScoreNode = document.querySelector("#final-score");

// ingredientes conseguidos
const caughtIngNode = document.querySelector("#caught-ing-list");

//creamos una variable del timer para poder acceder a ella después
let timer;

// variable game para poder acceder a ella
let game;

// ** FUNCIONES GLOBALES DE CAMBIO DE ESTADO E INICIO
function startGame() {
  // 1. ocultamos la pantalla de inicio
  splashScreenNode.style.display = "none";
  // 2. ocultamos la pantalla de gameOver
  gameOverScreenNode.style.display = "none";
  // 3. ocultamos la pantalla de results
  resultsScreenNode.style.display = "none";
  // 4. mostramos la pantalla de game
  gameScreenNode.style.display = "flex";
  // 5. iniciamos el juego
  // creamos el objeto que obtendrá todo nuestro juego (desde la clase Game)
  game = new Game();
  game.appearTimer();
  game.start();
  game.initBlocksFrecuency();
  game.initIngsFrecuency();
}

// ** EVENT LISTENER **
// boton Start: iniciar el juego
startBtnNode.addEventListener("click", startGame);

// boton start again: reiniciar el juego
reStartBtnNodeGameOver.addEventListener("click", startGame);
reStartBtnNodeResuls.addEventListener("click", startGame);

// tecla flecha hacia abajo
addEventListener("keydown", (event) => {
  if (event.code === "ArrowDown") {
    game.chef.moveDown();
  } else if (event.code === "ArrowUp") {
    game.chef.moveUp();
  }
});
