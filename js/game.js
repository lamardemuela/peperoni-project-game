class Game {
    //propiedades
    constructor() {
        // nuestro juego va a tener una propiedad de un chef
        this.chef = new Chef()
        //obstaculo bloque
        // Si tuvieramos solo un block: this.block  = new Block(), pero tendremos muchos, que guardamos en un array:
        this.blocksArr = []

        //todo obstaculo piña
        //todo ingredientes
        
    }


    //metodos
    gameLoop(){
        // console.log("juego andando");
        this.blocksArr.forEach((eachBlock) => {
            eachBlock.moveEffect()
        })
    }

    start() {
        setInterval(() => {
            this.gameLoop()
        }, Math.round(1000/60))
    }

    //funcion para cuando aparecen los blocks
    appearBlocks() {
        let spaceBtwBlocks = 300
        let randomPosY = Math.floor(Math.random() * 400)
        // fila 1 de blocks
        let rowBlock1 = new Block(randomPosY)
        this.blocksArr.push(rowBlock1)

        // fila 2 de blocks
        let rowBlock2 = new Block(randomPosY + spaceBtwBlocks)
        this.blocksArr.push(rowBlock2)
    }

    initBlocksFrecuency() {
        setInterval(() => {
            this.appearBlocks()
        }, 2000)
    }

    

    

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