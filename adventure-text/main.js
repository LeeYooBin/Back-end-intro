const prompt = require("prompt-sync")();
const readline = require("readline");
const Character = require("./Character");
const World = require("./World");

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

const main = async () => {
  while (true) {
    console.clear();
    console.log("Menu:");
    console.log("1. Jogar");
    console.log("2. Sair");

    const choice = prompt("Escolha uma opção: ").trim();

    if (choice === "1") {
      await playGame();
    } else if (choice === "2") {
      console.log("Saindo do jogo. Até mais!");
      break;
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  }
};

const playGame = async () => {
  console.clear();
  console.log("Bem-vindo ao Mundo de Wumpus!");

  const worldSize = 4;
  const world = new World(worldSize);
  const player = new Character("Jogador", 3);

  while (player.isAlive()) {
    console.clear();
    world.displayWorld(player);
    world.checkAdjacents(player);

    // Mostrar mensagens do personagem
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
        console.log("Você foi devorado pelo Wumpus!");
        player.alive = false;
      } else if (world.isPit(player.position)) {
        console.log("Você caiu em um buraco!");
        player.alive = false;
      } else if (world.isGold(player.position)) {
        console.log("Você encontrou o ouro! Parabéns, você venceu!");
        player.collectGold();
        break;
      }
    } else if (choice === "2") {
      console.log("\nDireções:");
      console.log("1. Cima");
      console.log("2. Baixo");
      console.log("3. Esquerda");
      console.log("4. Direita");
      const shootChoice = prompt("Escolha uma direção: ").trim();

      let direction;
      switch (shootChoice) {
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
          console.log("Direção inválida");
      }

      if (player.shoot()) {
        console.log("Você atirou uma flecha!");
        if (checkShoot(direction, player.position, world)) {
          console.log("Você matou o Wumpus!");
          break;
        } else {
          console.log("Você errou o Wumpus.");
        }
      }
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  }

  if (!player.isAlive()) {
    console.log("Fim de jogo!");
  }

  await waitForKeyPress();
};

const checkShoot = (direction, position, world) => {
  let targetPosition = { ...position };
  switch (direction) {
    case "up":
      targetPosition.y -= 1;
      break;
    case "down":
      targetPosition.y += 1;
      break;
    case "left":
      targetPosition.x -= 1;
      break;
    case "right":
      targetPosition.x += 1;
      break;
  }
  return world.isWumpus(targetPosition);
};

main();
