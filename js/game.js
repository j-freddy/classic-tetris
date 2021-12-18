class Game {
  constructor() {
    this.fps = _DATA.fps;
    this.nextPieceDelay = _DATA.delay.nextPiece;
    this.grid = new Grid();
    this.currentPiece = new Piece(PieceID.T);
    this.frameCount = 0;
    this.spawnNextPiece = false;
    // Delay to spawn next piece
    this.frameDelay = 0;
  }

  getGridData() {
    return this.grid.getDataWithCurrentPiece(this.currentPiece);
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
      if (this.frameCount % 3 === 0) {
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
        this.currentPiece = new Piece(PieceID.T);
        this.spawnNextPiece = false;
      }
    }
  }
}
