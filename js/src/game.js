class Game {
  constructor(level) {
    /* DATA */
    this.fps = _DATA.fps;
    this.nextPieceDelay = _DATA.delay.nextPiece;
    this.lineClearDelay = _DATA.delay.lineClear;
    this.DASMaxCharge = _DATA.delay.DAS.initial;
    this.DASMoveDelay = _DATA.delay.DAS.horizontal;
    this.levelData = _DATA.level;
    this.scoring = _DATA.scoring;

    /* OBJECTS */
    this.grid = new Grid();
    this.currentPiece = this.getRandomPieceNaive();
    this.nextPiece = this.getRandomPiece();

    /* OTHER */
    this.level = level;
    this.score = 0;
    this.lineClears = 0;
    this.prevLineClears = 0;
    this.pieceDropFrameCount = 0;
    this.spawnNextPiece = false;
    // Delay to spawn next piece
    this.frameDelay = 0;
    this.moveLeftPressed = false;
    this.moveRightPressed = false;
    this.DASCharge = 0;
  }

  init(level) {
    // TODO refactor constructor to use init()
    this.grid = new Grid();
    this.currentPiece = this.getRandomPieceNaive();
    this.nextPiece = this.getRandomPiece();
    this.level = level;
    this.score = 0;
    this.lineClears = 0;
    this.prevLineClears = 0;
    this.pieceDropFrameCount = 0;
    this.spawnNextPiece = true;
    this.frameDelay = 0;
    this.moveLeftPressed = false;
    this.moveRightPressed = false;
    this.DASCharge = 0;
  }

  reset() {
    // TODO
    this.init(18);
  }

  getGridData() {
    return this.spawnNextPiece ?
      this.grid.data : this.grid.getDataWithCurrentPiece(this.currentPiece);
  }

  currentLevelData() {
    return this.levelData[this.level];
  }

  getFramesPerDrop() {
    return this.currentLevelData().framesPerDrop;
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

  getScore(lines) {
    if (lines === 0) {
      return 0;
    }

    let rawScore;
    if (lines === 1) rawScore = this.scoring.single;
    if (lines === 2) rawScore = this.scoring.double;
    if (lines === 3) rawScore = this.scoring.triple;
    if (lines === 4) rawScore = this.scoring.tetris;

    return rawScore * (this.level + 1)
  }

  handleTopOut() {
    this.reset();
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

  updateForNextPiece() {
    this.currentPiece = this.nextPiece;
    this.nextPiece = this.getRandomPiece();
    this.spawnNextPiece = false;

    // Do not move piece via DAS during 1st frame of spawning piece
    // From my observation
    if (this.DASCharge = this.DASMaxCharge) {
      this.DASCharge--;
    }
  }

  updateRegardingLineClears() {
    this.lineClears += this.prevLineClears;
    this.score += this.getScore(this.prevLineClears);
    this.prevLineClears = 0;
  }

  // Thanks to https://www.youtube.com/watch?v=JeccfAI_ujo
  handleDAS() {
    if (this.moveLeftPressed || this.moveRightPressed) {
      if (this.DASCharge < this.DASMaxCharge) {
        this.DASCharge++;
      } else {
        // DAS fully charged
        if (this.frameDelay == 0) {
          // Move piece if not waiting for next piece
          if (this.moveLeftPressed) {
            if (this.tryMoveCurrentPiece(MoveDirection.LEFT)) {
              // Reset charge if move is successful
              // Add 1 to DAS charge to compensate current frame
              this.DASCharge -= this.DASMoveDelay - 1;
            }
          }
          if (this.moveRightPressed) {
            if (this.tryMoveCurrentPiece(MoveDirection.RIGHT)) {
              // Reset charge if move is successful
              // Add 1 to DAS charge to compensate current frame
              this.DASCharge -= this.DASMoveDelay - 1;
            }
          }
        }
      }
    }
  }

  // Ticks once per NES frame
  tick() {
    // TODO Refactor block drop speed
    if (!this.spawnNextPiece) {
      this.pieceDropFrameCount++;

      if (this.pieceDropFrameCount >= this.getFramesPerDrop()) {
        this.pieceDropFrameCount -= this.getFramesPerDrop();
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
        let lineCount = this.grid.removeFilledLines();

        if (lineCount > 0) {
          // Emulate line clear animation with a delay
          // Slightly inefficient: removeFilledLines() is called twice
          // Called 2nd time after delay, but it does nothing
          this.frameDelay = this.lineClearDelay;
          // Store temporarily as we will update after frame delay
          this.prevLineClears = lineCount;
          return;
        }

        this.updateRegardingLineClears();
        this.updateForNextPiece();
      }
    }

    this.handleDAS();

    if (this.grid.isToppedOut()) {
      this.handleTopOut();
    }
  }
}
