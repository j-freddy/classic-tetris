class Game {
  constructor() {
    this.grid = new Grid();
    this.currentPiece = new Piece(PieceID.T);
    this.frameCount = 0;
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
    this.frameCount %= _DATA.fps;
    
    // TODO Refactor
    if (this.frameCount % 3 === 0) {
      if (!this.tryMoveCurrentPieceDown()) {
        this.grid.addPieceToData(this.currentPiece);
        this.currentPiece = new Piece(PieceID.T);
      }
    }
  }
}
