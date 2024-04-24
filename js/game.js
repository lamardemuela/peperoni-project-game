class Game {
  // **** PROPIEDADES DE GAME ****

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
    this.gameDuration = 30;
    this.timeRemaining = this.gameDuration;
    // convertir el time remaining en minutos y segundos
    this.minutes = Math.floor(this.timeRemaining / 60)
      .toString()
      .padStart(2, "0");
    this.seconds = (this.timeRemaining % 60).toString().padStart(2, "0");

    // timer en el DOM
    this.timerNode = document.querySelector("#timeRemaining");
    this.timerNode.innerText = `${this.minutes}:${this.seconds}`;

    // ids de intervalos
    this.gameIntervalId;
    this.blocksIntervalId;
    this.ingIntervalId;

  }

  // **** METODOS DE GAME ****

  // * BLOQUES *

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
    this.blocksIntervalId = setInterval(() => {
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
          if(this.chef.x < 0) {
            this.gameOver()
          }
        } else if (eachBlock.type === "toRight") {
          this.chef.x += 40;
          this.chef.node.style.left = `${this.chef.x}px`;
          if(this.chef.x > 800 + this.chef.w) {
            this.gameOver()
          }
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

   // * CHEF *
  
  // desaparecer chef
  removeChef() {
    if (this.chef.x < 0 - this.chef.w || this.chef.x > 800 + this.chef.w) {
      //eliminamos el nodo
      this.chef.node.remove();
    }
  }

   // * INGREDIENTES *

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
    this.ingIntervalId = setInterval(() => {
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
          this.chef.health.value -= 25;
          if (this.chef.health.value === 0) {
            this.gameOver()
          }
        } else if (eachIngredient.type === "peperoni") {
          if (this.chef.health.value < 100) {
            this.chef.health.value += 10;
          }
        } else {
          this.chef.score.innerText++;
          this.chef.ingredientsListArr.push(eachIngredient.type)
        }
        console.log("colisionando");
        eachIngredient.node.remove();
        this.ingredientsArr.splice(index, 1);
      }
    });
  }

  // * TIMER *

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
        this.results()
      }
    }, 1000);
  }

  // * GAME OVER *

  gameOver() {
    // 1. todos los intervalos deben detenerse
    clearInterval(this.gameIntervalId)
    clearInterval(this.blocksIntervalId)
    clearInterval(this.ingIntervalId)
    // 2. ocultar pantalla de juego y forzamos ocultar pantalla de gameOver
    gameScreenNode.style.display = "none"
    gameOverScreenNode.style.display = "none"
    // 3. mostrar pantalla game over
    gameOverScreenNode.style.display = "flex"
  }

  // * RESULTS *

  results() {
    // 1. todos los intervalos deben detenerse
    clearInterval(this.gameIntervalId)
    clearInterval(this.blocksIntervalId)
    clearInterval(this.ingIntervalId)
    // 2. ocultar pantalla de juego
    gameScreenNode.style.display = "none"
    // 3. mostrar pantalla results
    resultsScreenNode.style.display = "flex"
    // 4. mostrar score
    finalScoreNode.append(this.chef.score.innerText)
    // 5. mostrar ingredientes conseguidos
    // caughtIngNode.append(this.chef.ingredientsListArr)
    
    this.chef.ingredientsListArr.forEach((eachIngredient) => {
      this.liNode = document.createElement("li")
      this.liNode.innerText = eachIngredient
      caughtIngNode.append(this.liNode)
    })

  }

  // * GAME LOOP *

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
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, Math.round(1000 / 60));
  }
}

//todo accion de game over, terminar el juego
//todo accion de resultados, terminar el juego
//todo accion de reiniciar el juego
