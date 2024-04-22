class Chef {
    // propiedades
    constructor() {
        // nodo: creamos imagen del chef y se la damos
        this.node = document.createElement("img")
        this.node.id = "chef"
        this.node.src = "./images/chef.png"

        // añadimos el chef al game-box
        gameboxNode.append(this.node)

        // valores ejeX, ejeY y ancho
        this.x = 30
        this.y = 200
        this.w = 32
        // this.h = 25

        //posicion, top, left y tamaño
        this.node.style.position = "absolute"
        this.node.style.top = `${this.y}px`
        this.node.style.left = `${this.x}px`
        this.node.style.width = `${this.w}px`
        // this.node.style.height = `${this.h}px`

        //velocidad de movimiento
        this.chefSpeed = 2
        //booleano para indicar que mientras clicko el chef se mueva hacia arriba o hacia abajo

        // propiedad health, entre 0 y 100
        this.health = progressBarNode.value
        // score
        this.score = scoreNode.innerText
    }

    // metodos
    //todo movimiento de chef hacia arrba y acia abajo
    moveDown() {
        this.y -= this.chefSpeed
        this.node.style.top = `${this.y}px`
    }

    // moveUp()

}