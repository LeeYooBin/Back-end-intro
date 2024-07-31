class Character {
  constructor(name, arrows) {
    this.name = name;
    this.arrows = arrows;
    this.position = { x: 0, y: 0 };
    this.alive = true;
    this.goldCollected = false;
    this.messages = [];
  }

  // Função responsável pela movimentação da personagem
  move(direction) {
    switch (direction) {
      case "up":
        if (this.position.y > 0) {
          this.position.y -= 1;
        } else {
          this.messages.push("Você bateu na parede! Não pode se mover para cima.");
        }
        break;
      case "down":
        if (this.position.y < 3) {
          this.position.y += 1;
        } else {
          this.messages.push("Você bateu na parede! Não pode se mover para baixo.");
        }
        break;
      case "left":
        if (this.position.x > 0) {
          this.position.x -= 1;
        } else {
          this.messages.push("Você bateu na parede! Não pode se mover para a esquerda.");
        }
        break;
      case "right":
        if (this.position.x < 3) {
          this.position.x += 1;
        } else {
          this.messages.push("Você bateu na parede! Não pode se mover para a direita.");
        }
        break;
      default:
        this.messages.push("Movimento inválido");
    }
  }

  // Função responsável por atirar flechas
  shoot() {
    if (this.arrows > 0) {
      this.arrows -= 1;
      return true;
    }
    this.messages.push("Você não tem mais flechas.");
    return false;
  }

  // Função para verificar se a personagem está viva
  isAlive() {
    return this.alive;
  }

  // Função para coletar o ouro
  collectGold() {
    this.goldCollected = true;
    this.messages.push("Você encontrou o ouro! Agora volte ao ponto de partida para vencer.");
  }

  // Função para retornar mensagens para situar no ambiente
  getMessages() {
    const messages = this.messages.slice();
    this.messages = [];
    return messages;
  }
}

module.exports = Character;
