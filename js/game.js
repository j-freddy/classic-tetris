class Game {
  constructor() {
    this.fps = _DATA.fps;
    this.nextPieceDelay = _DATA.delay.nextPiece;
    this.lineClearDelay = _DATA.delay.lineClear;
    this.DASMaxCharge = _DATA.delay.DAS.initial;
    this.DASMoveDelay = _DATA.delay.DAS.horizontal;
    this.grid = new Grid();
    this.currentPiece = this.getRandomPieceNaive();
    this.nextPiece = this.getRandomPiece();
    this.pieceDropFrameCount = 0;
    this.spawnNextPiece = false;
    // Delay to spawn next piece
    this.frameDelay = 0;
    this.moveLeftPressed = false;
    this.moveRightPressed = false;
    this.DASCharge = 0;
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

  tryMoveCurrentPiece(direction) {
    return this.currentPiece.tryMove(this.grid, direction);
  }

  tryRotateCurrentPieceClockwise() {
    return this.currentPiece.tryRotateClockwise(this.grid);
  }

  tryRotateCurrentPieceAntiClockwise() {
    return this.currentPiece.tryRotateAntiClockwise(this.grid);
  }

  moveKeyPressed(direction) {
    if (direction === MoveDirection.LEFT) {
      this.moveLeftPressed = true;
      // This behaviour is inaccurate with respect to original game
      this.moveRightPressed = false;
      this.tryMoveCurrentPiece(MoveDirection.LEFT);
    }

    if (direction === MoveDirection.RIGHT) {
      this.moveRightPressed = true;
      // This behaviour is inaccurate with respect to original game
      this.moveLeftPressed = false;
      this.tryMoveCurrentPiece(MoveDirection.RIGHT);
    }

    // Reset DAS, except during piece entry delay
    if (this.frameDelay === 0) {
      this.DASCharge = 0;
    }
  }

  // Thanks to https://www.youtube.com/watch?v=JeccfAI_ujo
  handleDAS() {
    if (this.moveLeftPressed || this.moveRightPressed) {
      if (this.DASCharge < this.DASMaxCharge) {
        // Charge DAS, except during piece entry delay
        if (this.frameDelay === 0) {
          this.DASCharge++;
        }
      } else {
        // DAS fully charged
        if (this.moveLeftPressed) {
          this.tryMoveCurrentPiece(MoveDirection.LEFT);
        }
        if (this.moveRightPressed) {
          this.tryMoveCurrentPiece(MoveDirection.RIGHT);
        }
        this.DASCharge -= this.DASMoveDelay;
      }
    }
  }

  // Ticks once per NES frame
  tick() {
    // TODO Refactor block drop speed
    if (!this.spawnNextPiece) {
      this.pieceDropFrameCount++;

      if (this.pieceDropFrameCount >= 4) {
        this.pieceDropFrameCount -= 4;
        // Move piece down
        if (!this.tryMoveCurrentPiece(MoveDirection.DOWN)) {
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
        if (this.grid.removeFilledLines()) {
          // Emulate line clear animation with a delay
          // Slightly inefficient: removeFilledLines() is called twice
          // Called 2nd time after delay, but it does nothing
          this.frameDelay = this.lineClearDelay;
          return;
        }

        // Spawn next piece
        this.currentPiece = this.nextPiece;
        this.nextPiece = this.getRandomPiece();
        this.spawnNextPiece = false;
      }
    }

    this.handleDAS();
  }
}
