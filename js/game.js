class Game {
  constructor() {
    this.grid = new Grid();
    this.currentPiece = new Piece(PieceID.T);
    this.frameCount = 0;
  }

  getGridData() {
    return this.grid.getDataWithCurrentPiece(this.currentPiece);
  }

  // 60 FPS
  tick() {
    this.frameCount++;
    this.frameCount %= _DATA.fps;
    
    // TODO Refactor
    if (this.frameCount % 5 === 0) {
      if (!this.currentPiece.tryMoveDown(this.grid)) {
        this.grid.addPieceToData(this.currentPiece);
        this.currentPiece = new Piece(PieceID.T);
      }
    }
  }
}
