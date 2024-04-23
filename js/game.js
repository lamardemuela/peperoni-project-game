class Game {
  //propiedades
  constructor() {
    // nuestro juego va a tener una propiedad de un chef
    this.chef = new Chef();
    console.log(this.chef)

    //obstaculo bloque
    // Si tuvieramos solo un block: this.block  = new Block(), pero tendremos muchos, que guardamos en un array:
    this.blocksArr = [];

    //ingredientes
    this.ingredientsArr = []
    console.log(this.ingredientsArr)

    //todo obstaculo piña
    //todo ingredientes
  }

  //metodos
  gameLoop() {
    // console.log("juego andando");
    this.blocksArr.forEach((eachBlock) => {
      eachBlock.moveEffect();
    });

    this.collisionChefBlock();
    this.removeBlocks()
    this.removeChef()

  }

  start() {
    setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));
  }

  //funcion para cuando aparecen los blocks
  appearBlocks() {
    // para que aparezcan de forma aleatoria
    let randomBlock = Math.round(Math.random());

    if (randomBlock === 0) {
      // fila 1 de blocks
      let rowBlock1 = new Block("toLeft");
      this.blocksArr.push(rowBlock1);
    } else {
      // fila 2 de blocks
      let rowBlock2 = new Block("toRight");
      this.blocksArr.push(rowBlock2);
    }
  }

  initBlocksFrecuency() {
    setInterval(() => {
      this.appearBlocks();
    }, 1500);
  }

  // colision chef-block
  collisionChefBlock() {
    this.blocksArr.forEach((eachBlock) => {
      if (
        this.chef.x < eachBlock.x + eachBlock.w &&
        this.chef.x + this.chef.w > eachBlock.x &&
        this.chef.y < eachBlock.y + eachBlock.h &&
        this.chef.y + this.chef.h > eachBlock.y
      ) {
        // Collision detected!
        if (eachBlock.type === "toLeft") {
            this.chef.x -= 40
            this.chef.node.style.left = `${this.chef.x}px`
        }else if(eachBlock.type === "toRight") {
            this.chef.x += 40
            this.chef.node.style.left = `${this.chef.x}px`
        }
      }
    });
  }

  // desaparecer blocks cuando salgan del gamebox
  removeBlocks() {
    this.blocksArr.forEach((eachBlock, index) => {
        if (eachBlock.type === "toLeft") {
            if((eachBlock.x + eachBlock.w) < 0){
                //eliminamos ese objeto block del array de blocks
                this.blocksArr.splice(index, 1)
                //eliminamos el nodo
                eachBlock.node.remove()
            }
        }else if(eachBlock.type === "toRight"){
            if((eachBlock.x + eachBlock.w) > (800 + eachBlock.w)){
                //eliminamos ese objeto block del array de blocks
                this.blocksArr.splice(index, 1)
                //eliminamos el nodo
                eachBlock.node.remove()
            }
        }
    })
  }

  // desaparecer chef
  removeChef(){
    if(this.chef.x < (0 - this.chef.w) || this.chef.x > (800 + this.chef.w)) {
        //eliminamos el nodo
        this.chef.node.remove()
    }
  }
    
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

