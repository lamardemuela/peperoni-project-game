class Chef {
  // propiedades
  constructor() {
    // nodo: creamos imagen del chef y se la damos
    this.node = document.createElement("img");
    this.node.id = "chef";
    this.node.src = "./images/chef.png";

    // añadimos el chef al game-box
    gameboxNode.append(this.node);

    // valores ejeX, ejeY y ancho
    this.x = 340;
    this.y = 240;
    this.w = 28;
    this.h = 48;

    //posicion, top, left y tamaño
    this.node.style.position = "absolute";
    this.node.style.top = `${this.y}px`;
    this.node.style.left = `${this.x}px`;
    this.node.style.width = `${this.w}px`;
    this.node.style.height = `${this.h}px`;

    //velocidad de movimiento
    this.chefSpeed = 40;

    // propiedad health, entre 0 y 100
    this.health = progressBarNode;
    // score
    this.score = scoreNode;

    // ingredientes conseguidos
    this.ingredientsListArr = [];
  }

  // metodos
  //movimiento de chef hacia arrba y acia abajo
  moveDown() {
    if (this.y + this.h < gameboxNode.offsetHeight) {
      this.y += this.chefSpeed;
      this.node.style.top = `${this.y}px`;
    }
  }

  moveUp() {
    if (this.y > 0) {
      this.y -= this.chefSpeed;
      this.node.style.top = `${this.y}px`;
    }
  }
}
