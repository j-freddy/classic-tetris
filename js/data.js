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
    "lineClear": 20
  },
  "piece": {
    "t": {
      "startRow": -1,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        [
          [0, 1, 0],
          [1, 1, 0],
          [0, 1, 0]
        ],
        [
          [0, 1, 0],
          [1, 1, 1],
          [0, 0, 0]
        ],
        [
          [0, 1, 0],
          [0, 1, 1],
          [0, 1, 0]
        ]
      ]
    },
    "j": {
      "startRow": 0,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0],
          [2, 2, 2],
          [0, 0, 2]
        ],
        [
          [0, 2, 0],
          [0, 2, 0],
          [2, 2, 0]
        ],
        [
          [2, 0, 0],
          [2, 2, 2],
          [0, 0, 0]
        ],
        [
          [0, 2, 2],
          [0, 2, 0],
          [0, 2, 0]
        ]
      ]
    },
    "z": {
      "startRow": 0,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0],
          [3, 3, 0],
          [0, 3, 3]
        ],
        [
          [0, 3, 0],
          [3, 3, 0],
          [3, 0, 0]
        ],
        [
          [3, 3, 0],
          [0, 3, 3],
          [0, 0, 0]
        ],
        [
          [0, 0, 3],
          [0, 3, 3],
          [0, 3, 0]
        ]
      ]
    },
    "o": {
      "startRow": 0,
      "startColumn": 4,
      "data": [
        [
          [4, 4],
          [4, 4]
        ]
      ]
    }
    
  },
  "gui": {
    // https://yeun.github.io/open-color/
    "gridColour": "#212529",
    "pieceColours": [
      "#fff",
      "#be4bdb", // T
      "#339af0", // J
      "#fa5252", // Z
      "#ffd43b", // O
    ]
  },
  "controls": {
    // Event codes
    "rotateClockwise": "KeyX",
    "rotateAntiClockwise": "KeyZ",
    "moveLeft": "ArrowLeft",
    "moveRight": "ArrowRight"
  }
}
