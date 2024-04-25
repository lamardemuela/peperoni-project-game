class Block {
    constructor(type, posY) {
        // nodo: creamos imagen del bloque y se la damos
        this.node = document.createElement("img")
        this.node.id = "block-obstacle"
        this.node.src = "./images/block.png"

        //diferenciamos el type, si va hacia la izquierda o hacia la derecha
        this.type = type

        // añadimos el chef al game-box
        gameboxNode.append(this.node)

        // posiciones Y (para indicar que salgan por arriba o por abajo)
        if(posY === "under"){
            this.y = Math.floor(Math.random() * 250) + 250
        } else if(posY === "over") {
            this.y = Math.floor(Math.random() * 250)
        }
        // valores ejeX, ejeY 
        if(this.type === "toRight") {
            this.x = -60    
        }else if(this.type === "toLeft") {
            this.x = 800    
        }
        //ancho y alto
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
    // movimiento de obstaculo bloque
    blockMoveEffect() {
        if(this.type === "toRight") {
            this.x += this.blockSpeed
            this.node.style.left = `${this.x}px`
        }else if(this.type === "toLeft") {
            this.x -= this.blockSpeed
            this.node.style.left = `${this.x}px`
        }
        
    }



    //todo desaparecen los bloques
    
}