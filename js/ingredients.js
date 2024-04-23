class Ingredients {
  // propiedades
  constructor(type) {
    // nodo: creamos imagen del bloque y se la damos
    this.node = document.createElement("img");
    this.node.id = "ingrediets";
    this.node.src = "./images/peperoni.png";

    //diferenciamos el type, si va hacia la izquierda o hacia la derecha
    this.type = type;

    // añadimos el chef al game-box
    gameboxNode.append(this.node);
  }

  // metodos
}
