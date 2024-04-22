class Block {
    constructor(posY) {
        // nodo: creamos imagen del bloque y se la damos
        this.node = document.createElement("img")
        this.node.id = "block-obstacle"
        this.node.src = "./images/block.png"

        // añadimos el chef al game-box
        gameboxNode.append(this.node)

        // valores ejeX, ejeY y ancho
        this.x = 800
        this.y = posY
        this.w = 60
        this.h = 20

        //posicion, top, left y tamaño
        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.w}px`
        this.node.style.height = `${this.h}px`

        //velocidad de movimiento
        this.blockSpeed = 2
    }

    // metodos
    //todo movimiento de obstaculo bloque
    moveEffect() {
        this.x -= this.blockSpeed
        this.node.style.left = `${this.x}px`
    }


    //todo aparecen los bloques
    //todo desaparecen los bloques
    
}