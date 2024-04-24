class Game {
  // **** PROPIEDADES DE GAME ****

  constructor() {
    // ----- sonidos -----
    this.sonidosArr = [
      new Audio("./sounds/coll-blocks.ogg"),
      new Audio("./sounds/coll-ing.ogg"),
      new Audio("./sounds/coll-peperoni.ogg"),
      new Audio("./sounds/coll-pina.ogg"),
      new Audio("./sounds/game-over.ogg"),
      new Audio("./sounds/results.ogg"),
      new Audio("./sounds/sound-bg.ogg")
    ]

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
      "queso",
      "salsa-tomate",
      "salchicha",
      "huevo",
      "bacon"
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
      console.log("interval de block sigue andando")
      this.appearBlocks();
    }, 950);
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
          this.sonidosArr[0].play()
          this.chef.x -= 40;
          this.chef.node.style.left = `${this.chef.x}px`;
          if (this.chef.x < 0) {
            this.sonidosArr[4].play()
            this.gameOver();
          }
        } else if (eachBlock.type === "toRight") {
          this.sonidosArr[0].play()
          this.chef.x += 40;
          this.chef.node.style.left = `${this.chef.x}px`;
          if (this.chef.x > 800 + this.chef.w) {
            this.sonidosArr[4].play()
            this.gameOver();
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
    let randomBlock = Math.round(Math.random());
    if (randomBlock === 0) {
      // mostramos piñas
      let pinaIngredient = new Ingredient(this.typesIngredientsArr[5])
      this.ingredientsArr.push(pinaIngredient)
    } else {
      // mostramos el resto de ingredientes
      let randomTypeIng = Math.floor(
        Math.random() * this.typesIngredientsArr.length
      );
      let randomIngredient = new Ingredient(
        this.typesIngredientsArr[randomTypeIng]
      );
      this.ingredientsArr.push(randomIngredient);
    }
  }

  initIngsFrecuency() {
    this.ingIntervalId = setInterval(() => {
      console.log("interval de ingredientes sigue andando")
      this.appearIngredients();
    }, 950);
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
          this.sonidosArr[3].play()
          this.chef.health.value -= 25;
          if (this.chef.health.value === 0) {
            this.sonidosArr[4].play()
            this.gameOver();
          }
        } else if (eachIngredient.type === "peperoni") {
          this.chef.score.innerText++;
          this.chef.ingredientsListArr.push(eachIngredient.type);
          this.sonidosArr[1].play()
          if (this.chef.health.value < 100) {
            this.chef.health.value += 10;
            this.sonidosArr[2].play()
          }
        } else {
          this.sonidosArr[1].play()
          this.chef.score.innerText++;
          this.chef.ingredientsListArr.push(eachIngredient.type);
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
      console.log("interval de timer sigue andando")
      this.timeRemaining -= 1;
      this.minutes = Math.floor(this.timeRemaining / 60)
        .toString()
        .padStart(2, "0");
      this.seconds = (this.timeRemaining % 60).toString().padStart(2, "0");
      this.timerNode.innerText = `${this.minutes}:${this.seconds}`;

      if (this.timeRemaining === 0) {
        this.sonidosArr[5].play()
        clearInterval(timer);
        this.results();
      }
    }, 1000);
  }

  // * GAME OVER *

  gameOver() {
    // 1. todos los intervalos deben detenerse
    clearInterval(this.gameIntervalId);
    clearInterval(this.blocksIntervalId);
    clearInterval(this.ingIntervalId);
    clearInterval(timer)
    // 2. ocultar pantalla de juego 
    gameScreenNode.style.display = "none";
    gameboxNode.innerHTML = ""
    // 3. mostrar pantalla game over
    gameOverScreenNode.style.display = "flex";
    // 4. paramos el sonido
    this.sonidosArr[6].pause()
  }

  // * RESULTS *

  results() {
    // 1. todos los intervalos deben detenerse
    clearInterval(this.gameIntervalId);
    clearInterval(this.blocksIntervalId);
    clearInterval(this.ingIntervalId);
    clearInterval(timer)
    // 2. ocultar pantalla de juego
    gameScreenNode.style.display = "none";
    gameboxNode.innerHTML = ""
    // 3. mostrar pantalla results
    resultsScreenNode.style.display = "flex";
    // 4. mostrar score
    finalScoreNode.innerText = this.chef.score.innerText;
    // 5. mostrar ingredientes conseguidos
    this.chef.ingredientsListArr.forEach((eachIngredient) => {
      this.liNode = document.createElement("li");
      this.liNode.innerText = eachIngredient;
      caughtIngNode.append(this.liNode);
    });
    //6. paramos el sonido
    this.sonidosArr[6].pause()
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
    // musica de fondo
    this.sonidosArr[6].play()
    // reiniciamos health y score
    scoreNode.innerText = 0
    progressBarNode.value = 100
    this.gameIntervalId = setInterval(() => {
      console.log("interval de start sigue andando")
      this.gameLoop();
    }, Math.round(1000 / 60));
  }
}

