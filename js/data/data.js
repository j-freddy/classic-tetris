/*
  See for details: https://tetris.fandom.com/wiki/Tetris_(NES,_Nintendo)
*/

const _DATA = {
  "grid": {
    "numRows": 20,
    "numColumns": 10
  },
  "fps": 60,
  "delay": {
    // Inaccurate: see https://tetris.fandom.com/wiki/Tetris_(NES,_Nintendo)
    "nextPiece": 10,
    "lineClear": 20,
    "DAS": {
      "initial": 16,
      "horizontal": 6
    }
  },
  "pieceIds": ["t", "j", "z", "o", "s", "l", "i"],
  "linesBeforeLevelIncrease": 10,
  "scoring": {
    "single": 40,
    "double": 100,
    "triple": 300,
    "tetris": 1200
  },
  "controls": {
    // Event codes
    "rotateClockwise": "KeyX",
    "rotateAntiClockwise": "KeyZ",
    "moveLeft": "ArrowLeft",
    "moveRight": "ArrowRight"
  }
}
