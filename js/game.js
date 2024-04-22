class Game {
    //propiedades
    constructor() {
        // nuestro juego va a tener una propiedad de un chef
        this.chef = new Chef()
    
        //todo obstaculo bloque
        //todo obstaculo piña
        //todo ingredientes
        

    }


    //metodos
    gameLoop(){
        console.log("juego andando");
    }

    start() {
        setInterval(() => {
            this.gameLoop()
        }, Math.round(1000/60))
    }

    

    //todo movimiento de obstaculo bloque
    //todo aparecen los bloques
    //todo desaparecen los bloques

    //todo movimiento de obstaculo piña
    //todo aparecen las piñas
    //todo desaparecen las piñas

    //todo movimiento de ingredientes
    //todo aparecen los ingredientes
    //todo desaparecen los ingredientes

    //todo colision chef-bloque
    //todo colision chef-piña

    //todo accion de game over, terminar el juego
    //todo accion de resultados, terminar el juego
    //todo accion de reiniciar el juego



}