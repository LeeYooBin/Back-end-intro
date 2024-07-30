class World {
  constructor(size) {
    this.size = size;
    this.grid = this.createGrid(size);
    this.wumpusPosition = this.placeItem(this.isAdjacentToStart);
    this.goldPosition = this.placeItem(pos => pos.x !== this.wumpusPosition.x || pos.y !== this.wumpusPosition.y);
    this.pits = this.placePits();
  }

  // Função para gerar o mapa
  createGrid(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid.push(new Array(size).fill(null));
    }
    return grid;
  }

  // Função auxiliar para garantir que tesouros e obstáculos não apareçam adjacentes à personagem
  isAdjacentToStart(position) {
    const start = { x: 1, y: 1 };
    const adjacent = [
      { x: start.x - 1, y: start.y }, // Esquerda
      { x: start.x + 1, y: start.y }, // Direita
      { x: start.x, y: start.y - 1 }, // Cima
      { x: start.x, y: start.y + 1 }  // Baixo
    ];
    return adjacent.some(adj => adj.x === position.x && adj.y === position.y);
  }

  // Posiciona os obstaculos longe da personagem
  placeItem(shouldAvoid) {
    let position;
    do {
      position = {
        x: Math.floor(Math.random() * this.size),
        y: Math.floor(Math.random() * this.size),
      };
    } while (position.x === 0 && position.y === 0 || shouldAvoid(position));
    return position;
  }

  // Posiciona os buracos
  placePits() {
    let pits = [];
    const maxPits = this.size - 1; // O número máximo de pits é o tamanho do mundo - 1
    for (let i = 0; i < maxPits; i++) {
      let pitPosition;
      do {
        pitPosition = this.placeItem(pos => 
          this.isWumpus(pos) || 
          this.isGold(pos) || 
          this.isAdjacentToStart(pos) || 
          pits.some(pit => pit.x === pos.x && pit.y === pos.y)
        );
      } while (pits.some(pit => pit.x === pitPosition.x && pit.y === pitPosition.y));
      pits.push(pitPosition);
    }
    return pits;
  }

  // Verifica se o wumpus está na posição
  isWumpus(position) {
    return this.wumpusPosition.x === position.x && this.wumpusPosition.y === position.y;
  }

  // Verifica se o ouro está na posição
  isGold(position) {
    return this.goldPosition.x === position.x && this.goldPosition.y === position.y;
  }

  // Verifica se o buraco está na posição
  isPit(position) {
    return this.pits.some(pit => pit.x === position.x && pit.y === position.y);
  }

  // Retorna posições adjacentes à personagem
  getAdjacentPositions(position) {
    let positions = [];
    if (position.x > 0) positions.push({ x: position.x - 1, y: position.y });
    if (position.x < this.size - 1) positions.push({ x: position.x + 1, y: position.y });
    if (position.y > 0) positions.push({ x: position.x, y: position.y - 1 });
    if (position.y < this.size - 1) positions.push({ x: position.x, y: position.y + 1 });
    return positions;
  }

  // Retorna informações relacionadas ao ambiente
  checkAdjacents(character) {
    const adjacents = this.getAdjacentPositions(character.position);
    for (let pos of adjacents) {
      if (this.isWumpus(pos)) {
        console.log("Você sente um fedor...");
      }
      if (this.isPit(pos)) {
        console.log("Você sente uma brisa...");
      }
    }
  }

  // Retorna um mapa
  displayWorld(character) {
    for (let y = 0; y < this.size; y++) {
      let row = "";
      for (let x = 0; x < this.size; x++) {
        if (character.position.x === x && character.position.y === y) {
          row += "C ";
        } else {
          row += ". ";
        }
      }
      console.log(row);
    }
    console.log(`Flechas restantes: ${character.arrows}`);
  }
}

module.exports = World;
