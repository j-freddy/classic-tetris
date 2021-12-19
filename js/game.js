class Game {
  constructor() {
    this.fps = _DATA.fps;
    this.nextPieceDelay = _DATA.delay.nextPiece;
    this.grid = new Grid();
    this.currentPiece = this.getRandomPieceNaive();
    this.nextPiece = this.getRandomPiece();
    this.frameCount = 0;
    this.spawnNextPiece = false;
    // Delay to spawn next piece
    this.frameDelay = 0;
  }

  getGridData() {
    return this.spawnNextPiece ?
      this.grid.data : this.grid.getDataWithCurrentPiece(this.currentPiece);
  }

  getRandomPieceNaive() {
    const sack = _DATA.pieceIds;
    return new Piece(sack[Math.floor(Math.random() * sack.length)]);
  }

  // 1/49 chance to get same piece 2 times in a row
  getRandomPiece(prevId=this.currentPiece.id) {
    let piece = this.getRandomPieceNaive();

    if (piece.id === prevId) {
      piece = this.getRandomPieceNaive();
    }

    return piece;
  }

  tryMoveCurrentPieceDown() {
    return this.currentPiece.tryMoveDown(this.grid);
  }

  tryMoveCurrentPieceLeft() {
    return this.currentPiece.tryMoveLeft(this.grid);
  }

  tryMoveCurrentPieceRight() {
    return this.currentPiece.tryMoveRight(this.grid);
  }

  tryRotateCurrentPieceClockwise() {
    return this.currentPiece.tryRotateClockwise(this.grid);
  }

  tryRotateCurrentPieceAntiClockwise() {
    return this.currentPiece.tryRotateAntiClockwise(this.grid);
  }

  // Ticks once per NES frame
  tick() {
    this.frameCount++;
    this.frameCount %= this.fps;
    
    // TODO Refactor
    if (!this.spawnNextPiece) {
      if (this.frameCount % 4 === 0) {
        // Move piece down
        if (!this.tryMoveCurrentPieceDown()) {
          // If not successful, that means piece has landed
          // Update grid
          this.grid.addPieceToData(this.currentPiece);
          // Prepare for next piece
          this.frameDelay = this.nextPieceDelay;
          this.spawnNextPiece = true;
        }
      }
    } else {
      // Handle delay before spawning next piece
      if (this.frameDelay > 0) {
        this.frameDelay--;
      } else {
        // Clear filled lines
        this.grid.removeFilledLines();
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.getRandomPiece();
        this.spawnNextPiece = false;
      }
    }
  }
}
