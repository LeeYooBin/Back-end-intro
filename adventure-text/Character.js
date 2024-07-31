class Character {
  constructor(name, arrows) {
    this.name = name;
    this.arrows = arrows;
    this.position = { x: 0, y: 0 };
    this.alive = true;
    this.goldCollected = false;
    this.messages = [];
    this.score = 0; // Inicializa a pontuação
  }

  // Função responsável pela movimentação da personagem
  move(direction) {
    if (!this.alive) return;

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
    this.score -= 1; // Perde 1 ponto ao se mover
  }

  // Função responsável por atirar flechas
  shoot() {
    if (!this.alive) return false;

    if (this.arrows > 0) {
      this.arrows -= 1;
      this.score -= 10; // Perde 10 pontos ao atirar flecha
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
    if (!this.alive) return;

    this.goldCollected = true;
    this.messages.push("Você encontrou o ouro! Agora volte ao ponto de partida para vencer.");
  }

  // Função para retornar mensagens para situar no ambiente
  getMessages() {
    const messages = this.messages.slice();
    this.messages = [];
    return messages;
  }

  // Função para finalizar o jogo com base na vitória ou derrota
  endGame(isVictory) {
    if (isVictory) {
      this.score += 1000; // Ganha 1000 pontos ao vencer
      this.messages.push(`Parabéns! Você coletou o ouro e voltou ao ponto de partida. Você venceu com ${this.score} pontos!`);
    } else {
      this.score -= 1000; // Perde 1000 pontos ao morrer
      this.messages.push(`Game Over! Você morreu com ${this.score} pontos.`);
    }
  }
}

module.exports = Character;
