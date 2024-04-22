// ** ELEMENTOS DEL DOM Y VARIABLES GLOBALES **

// pantallas
const splashScreenNode = document.querySelector("#splash-screen")
const gameScreenNode = document.querySelector("#game-screen")
const gameOverScreenNode = document.querySelector("#game-over-screen")
const resultsScreenNode = document.querySelector("#results-screen")

// botones
const startBtnNode = document.querySelector("#start-btn")
const reStartBtnNode = document.querySelector(".re-start-btn")

// game box
const gameboxNode = document.querySelector("#game-box")

// progress bar
const progressBarNode = document.querySelector("progress")

// score
const scoreNode = document.querySelector("#score")



// ** FUNCIONES GLOBALES DE CAMBIO DE ESTADO E INICIO
function startGame() {
    // 1. ocultamos la pantalla de inicio
    splashScreenNode.style.display = "none"
    // 2. mostramos la pantalla de inicio
    gameScreenNode.style.display = "flex"
    // 3. iniciamos el juego
    // creamos el objeto que obtendrá todo nuestro juego (desde la clase Game)
    const game = new Game()
    console.log(game) // para probar
    game.start()
}




// ** EVENT LISTENER **
startBtnNode.addEventListener("click", startGame)