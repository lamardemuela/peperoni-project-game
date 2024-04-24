class Game {
  //propiedades
  constructor() {
    // nuestro juego va a tener una propiedad de un chef
    this.chef = new Chef();
    console.log(this.chef);

    //obstaculo bloque
    // Si tuvieramos solo un block: this.block  = new Block(), pero tendremos muchos, que guardamos en un array:
    this.blocksArr = [];

    //ingredientes
    this.ingredientsArr = [];
    this.typesIngredientsArr = [
      "albahaca",
      "atun",
      "cebolla",
      "jamon",
      "peperoni",
      "pina",
      "salsa",
    ];

    // propiedad para el timer
    this.gameDuration = 120;
    this.timeRemaining = this.gameDuration;
    // convertir el time remaining en minutos y segundos
    this.minutes = Math.floor(this.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    this.seconds = (this.timeRemaining % 60).toString().padStart(2, "0");

    // timer en el DOM
    this.timerNode = document.querySelector("#timeRemaining");
    this.timerNode.innerText = `${this.minutes}:${this.seconds}`;
  }

  //metodos

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
    }, 1000);
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
          this.chef.x -= 40;
          this.chef.node.style.left = `${this.chef.x}px`;
        } else if (eachBlock.type === "toRight") {
          this.chef.x += 40;
          this.chef.node.style.left = `${this.chef.x}px`;
        }
      }
    });
  }

  // desaparecer blocks cuando salgan del gamebox
  removeBlocks() {
    this.blocksArr.forEach((eachBlock, index) => {
      if (eachBlock.type === "toLeft") {
        if (eachBlock.x + eachBlock.w < 0) {
          //eliminamos ese objeto block del array de blocks
          this.blocksArr.splice(index, 1);
          //eliminamos el nodo
          eachBlock.node.remove();
        }
      } else if (eachBlock.type === "toRight") {
        if (eachBlock.x + eachBlock.w > 800 + eachBlock.w) {
          //eliminamos ese objeto block del array de blocks
          this.blocksArr.splice(index, 1);
          //eliminamos el nodo
          eachBlock.node.remove();
        }
      }
    });
  }

  // desaparecer chef
  removeChef() {
    if (this.chef.x < 0 - this.chef.w || this.chef.x > 800 + this.chef.w) {
      //eliminamos el nodo
      this.chef.node.remove();
    }
  }

  // aparecen los ingredientes
  appearIngredients() {
    let randomTypeIng = Math.floor(
      Math.random() * this.typesIngredientsArr.length
    );
    let randomIngredient = new Ingredient(
      this.typesIngredientsArr[randomTypeIng]
    );
    this.ingredientsArr.push(randomIngredient);
  }

  initIngsFrecuency() {
    setInterval(() => {
      this.appearIngredients();
    }, 2000);
  }

  // colision chef - ingredientes
  collisionChefIgredient() {
    this.ingredientsArr.forEach((eachIngredient, index) => {
      if (
        this.chef.x < eachIngredient.x + eachIngredient.w &&
        this.chef.x + this.chef.w > eachIngredient.x &&
        this.chef.y < eachIngredient.y + eachIngredient.h &&
        this.chef.y + this.chef.h > eachIngredient.y
      ) {
        // Collision detected!
        if (eachIngredient.type === "pina") {
          this.chef.health.value -= 10;
        } else if (eachIngredient.type === "peperoni") {
          if (this.chef.health.value < 100) {
            this.chef.health.value += 10;
          }
        } else {
          this.chef.score.innerText++;
        }
        console.log("colisionando");
        eachIngredient.node.remove();
        this.ingredientsArr.splice(index, 1);
      }
    });
  }

  // ** TIMER **
  appearTimer() {
    timer = setInterval(() => {
      this.timeRemaining -= 1;
      this.minutes = Math.floor(this.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      this.seconds = (this.timeRemaining % 60).toString().padStart(2, "0");
      this.timerNode.innerText = `${this.minutes}:${this.seconds}`;

      if (this.timeRemaining === 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

  // ** GAME LOOP **
  gameLoop() {
    this.blocksArr.forEach((eachBlock) => {
      eachBlock.blockMoveEffect();
    });

    this.collisionChefBlock();
    this.removeBlocks();
    this.removeChef();

    this.ingredientsArr.forEach((eachIngredient) => {
      eachIngredient.ingMoveEffect();
    });

    this.collisionChefIgredient();
  }

  start() {
    setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));
  }
}

//todo accion de game over, terminar el juego
//todo accion de resultados, terminar el juego
//todo accion de reiniciar el juego
