class Canvas {
  constructor(id) {
    this.element = document.getElementById(id);
    this.ctx = this.element.getContext("2d");
  }

  get width() {
    return this.element.width;
  }

  get height() {
    return this.element.height;
  }
}

const mainCanvas = new Canvas("canvas");
const nextBoxCanvas = new Canvas("next-box");

// TODO Update
const levelElement = document.getElementById("level");
const lineClearsElement = document.getElementById("line-clears");
const scoreElement = document.getElementById("score");

function tempInterface(game) {
  levelElement.innerHTML = "Level: " + game.level;
  lineClearsElement.innerHTML = "Line clears: " + game.lineClears;
  scoreElement.innerHTML = "Score: " + game.score;
}

class GUI {
  static get controls() {
    return _DATA.controls;
  }

  static get cellSize() {
    return Math.min(
      mainCanvas.height / _DATA.grid.numRows,
      mainCanvas.width / _DATA.grid.numColumns
    );
  }

  static drawRect(x, y, width, height, canvas, colour="#000") {
    let ctx = canvas.ctx;
    ctx.save();
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
  }

  // Helper function for drawing a 2D matrix
  static drawMatrix(data, canvas, dim=GUI.cellSize) {

    // For each row
    for (let i = 0; i < data.length; i++) {
      // For each column
      for (let j = 0; j < data[i].length; j++) {
        const fill = data[i][j];
        if (fill !== 0) {
          GUI.drawRect(j * dim, i * dim, dim, dim, canvas,
                       _DATA.gui.pieceColours[fill]);
        }
      }
    }
  }

  static drawBackground(canvas) {
    GUI.drawRect(0, 0, canvas.width, canvas.height, canvas,
                 _DATA.gui.gridColour);
  }

  static drawMain(game) {
    GUI.drawBackground(mainCanvas);
    GUI.drawMatrix(game.getGridData(), mainCanvas);
  }

  static drawNextBox(game) {
    GUI.drawBackground(nextBoxCanvas);
    GUI.drawMatrix(game.nextPiece.getShape(), nextBoxCanvas);
  }

  static draw(game) {
    GUI.drawMain(game);
    GUI.drawNextBox(game);

    // TODO Update interface for statistics
    tempInterface(game);
  }

  static startEventHandlers(game) {
    document.addEventListener("keydown", e => {
      // Ignore key being held down
      if (e.repeat) {
        return;
      }

      if (e.code === GUI.controls.rotateClockwise) {
        game.tryRotateCurrentPieceClockwise();
      }

      if (e.code === GUI.controls.rotateAntiClockwise) {
        game.tryRotateCurrentPieceAntiClockwise();
      }

      if (e.code === GUI.controls.moveLeft) {
        game.moveKeyPressed(MoveDirection.LEFT);
      }

      if (e.code === GUI.controls.moveRight) {
        game.moveKeyPressed(MoveDirection.RIGHT);
      }
    });

    document.addEventListener("keyup", e => {
      if (e.code === GUI.controls.moveLeft) {
        game.moveLeftPressed = false;
      }

      if (e.code === GUI.controls.moveRight) {
        game.moveRightPressed = false;
      }
    });
  }
}
