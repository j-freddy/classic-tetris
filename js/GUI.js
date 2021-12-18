const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class GUI {
  static get controls() {
    return _DATA.controls;
  }

  static get cellSize() {
    return Math.min(
      canvas.height / _DATA.grid.numRows,
      canvas.width / _DATA.grid.numColumns
    );
  }

  static drawRect(x, y, width, height, colour="#000") {
    ctx.save();
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, width, height);
    ctx.restore();
  }

  static drawBackground() {
    GUI.drawRect(0, 0, canvas.width, canvas.height, _DATA.gui.gridColour);
  }

  static drawGrid(game) {
    const dim = GUI.cellSize;
    const data = game.getGridData();
    // For each row
    for (let i = 0; i < data.length; i++) {
      // For each column
      for (let j = 0; j < data[i].length; j++) {
        const fill = data[i][j];
        if (fill !== 0) {
          GUI.drawRect(j * dim, i * dim, dim, dim, _DATA.gui.pieceColours[fill]);
        }
      }
    }
  }

  static draw(game) {
    GUI.drawBackground();
    GUI.drawGrid(game);
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
        game.tryMoveCurrentPieceLeft();
      }

      if (e.code === GUI.controls.moveRight) {
        game.tryMoveCurrentPieceRight();
      }
    });
  }
}
