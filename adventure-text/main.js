const prompt = require("prompt-sync")();
const readline = require("readline");
const Character = require("./Character");
const World = require("./World");

// Aguarda o usuário pressionar enter
const waitForKeyPress = () => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    console.log("\nPressione Enter para voltar ao menu principal...");
    rl.question("", () => {
      rl.close();
      console.clear();
      resolve();
    });
  });
};

// Função para obter uma entrada numérica válida ou retornar um valor padrão
const getValidNumberInput = (promptText, min, max, defaultValue) => {
  let value;
  do {
    const input = prompt(promptText).trim();
    value = input === "" ? defaultValue : parseInt(input, 10);
  } while (isNaN(value) || value < min || value > max);
  return value;
};

// Função para obter a entrada de sim ou não para exibição do mapa
const getValidYesNoInput = (promptText) => {
  let input;
  do {
    input = prompt(promptText).trim().toLowerCase();
  } while (input !== "s" && input !== "n");
  return input === "s";
};

// Função que roda o jogo
const playGame = async () => {
  console.clear();
  const worldSize = getValidNumberInput("Digite a dimensão do mapa (mínimo 4, padrão 4): ", 4, Infinity, 4);
  const arrowNumber = getValidNumberInput("Digite o número de flechas (mínimo 1, máximo 3, padrão 1): ", 1, 3, 1);
  const showMap = getValidYesNoInput("Permitir o auxílio do mapa? (s/n): ");

  console.clear();
  console.log("Bem-vindo ao Mundo de Wumpus!");

  const world = new World(worldSize);
  const player = new Character("Jogador", arrowNumber);

  while (player.isAlive()) {
    console.clear();
    if (showMap) {
      world.displayWorld(player);
    }
    world.checkAdjacents(player);

    const messages = player.getMessages();
    if (messages.length > 0) {
      messages.forEach(msg => console.log(msg));
    }

    console.log("\nMenu:");
    console.log("1. Mover-se");
    console.log("2. Atirar flecha");
    const choice = prompt("Escolha uma opção: ").trim();

    if (choice === "1") {
      console.log("\nMovimentos:");
      console.log("1. Cima");
      console.log("2. Baixo");
      console.log("3. Esquerda");
      console.log("4. Direita");
      const moveChoice = prompt("Escolha uma direção: ").trim();

      let direction;
      switch (moveChoice) {
        case "1":
          direction = "up";
          break;
        case "2":
          direction = "down";
          break;
        case "3":
          direction = "left";
          break;
        case "4":
          direction = "right";
          break;
        default:
          console.log("Movimento inválido");
      }

      player.move(direction);

      if (world.isWumpus(player.position)) {
        player.messages.push("Você foi devorado pelo Wumpus!");
        player.alive = false;
        console.clear();
        world.displayWorld(player);
        player.getMessages().forEach(msg => console.log(msg));
        await waitForKeyPress();
      } else if (world.isPit(player.position)) {
        player.messages.push("Você caiu em um buraco!");
        player.alive = false;
        console.clear();
        world.displayWorld(player);
        player.getMessages().forEach(msg => console.log(msg));
        await waitForKeyPress();
      } else if (world.isGold(player.position)) {
        player.collectGold();
        world.goldPosition = null;
      }

    } else if (choice === "2") {
      console.log("\nAtirar flecha:");
      console.log("1. Cima");
      console.log("2. Baixo");
      console.log("3. Esquerda");
      console.log("4. Direita");
      const shootChoice = prompt("Escolha uma direção: ").trim();

      let shootDirection;
      switch (shootChoice) {
        case "1":
          shootDirection = "up";
          break;
        case "2":
          shootDirection = "down";
          break;
        case "3":
          shootDirection = "left";
          break;
        case "4":
          shootDirection = "right";
          break;
        default:
          console.log("Direção inválida");
      }

      if (player.shoot()) {
        const hitPosition = { ...player.position };

        switch (shootDirection) {
          case "up":
            hitPosition.y -= 1;
            break;
          case "down":
            hitPosition.y += 1;
            break;
          case "left":
            hitPosition.x -= 1;
            break;
          case "right":
            hitPosition.x += 1;
            break;
        }

        if (world.isWumpus(hitPosition)) {
          player.messages.push("Você matou o Wumpus! Agora colete o ouro e volte ao ponto de partida.");
          world.wumpusPosition = null;
        } else {
          player.messages.push("Você errou a flecha.");
        }
      }
    } else {
      console.log("Opção inválida. Tente novamente.");
    }

    if (player.goldCollected && player.position.x === 0 && player.position.y === 0) {
      console.clear();
      world.displayWorld(player);
      player.messages.push("Parabéns! Você coletou o ouro e voltou ao ponto de partida. Você venceu!");
      player.getMessages().forEach(msg => console.log(msg));
      await waitForKeyPress();
      break;
    }
  }
};

// Função principal
const main = async () => {
  while (true) {
    console.clear();
    console.log("1. Jogar");
    console.log("2. Sair");

    const choice = prompt("Escolha uma opção: ").trim();

    if (choice === "1") {
      await playGame();
    } else if (choice === "2") {
      console.log("Encerrando o programa...");
      break;
    } else {
      console.log("\nOpção inválida. Tente novamente.");
      await waitForKeyPress();
    }
  }
};

main();