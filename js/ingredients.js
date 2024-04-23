class Ingredient {
  // propiedades
  constructor(type) {
    // nodo: creamos imagen del bloque y se la damos
    this.node = document.createElement("img");
    this.node.id = "ingrediets";
    this.node.alt = "ingrediente"

    //diferenciamos el type, si va hacia la izquierda o hacia la derecha
    this.type = type;
    if (type === "albahaca") {
        this.node.src = "./images/albahaca.png"
    } else if(type === "atun") {
        this.node.src = "./images/atun.png"
    } else if(type === "cebolla") {
        this.node.src = "./images/cebolla.png"
    } else if(type === "jamon") {
        this.node.src = "./images/jamon.png"
    } else if(type === "peperoni") {
        this.node.src = "./images/peperoni.png"
    } else if(type === "pina") {
        this.node.src = "./images/pina.png"
    } else if(type === "salsa") {
        this.node.src = "./images/salsa.png"
    }

    // añadimos el chef al game-box
    gameboxNode.append(this.node);

    // valores ejeX, ejeY y ancho
    this.x = 800
    this.y = Math.floor(Math.random() * 500)
    this.w = 24
    this.h = 24

    //posicion, top, left y tamaño
    this.node.style.position = "absolute"
    this.node.style.top = `${this.y}px`
    this.node.style.left = `${this.x}px`
    this.node.style.width = `${this.w}px`
    this.node.style.height = `${this.h}px`

    //velocidad de movimiento
    this.ingSpeed = 2

  }

  // metodos
  ingMoveEffect() {
    this.x -= this.ingSpeed
    this.node.style.left = `${this.x}px`
  }
}
