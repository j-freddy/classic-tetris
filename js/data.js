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
  "pieceIds": ["t", "j", "z", "o", "s", "l", "i"],
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
      "startRow": -1,
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
      "startRow": -1,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0],
          [3, 3, 0],
          [0, 3, 3]
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
    },
    "s": {
      "startRow": -1,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0],
          [0, 5, 5],
          [5, 5, 0]
        ],
        [
          [0, 5, 0],
          [0, 5, 5],
          [0, 0, 5]
        ]
      ]
    },
    "l": {
      "startRow": -1,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0],
          [6, 6, 6],
          [6, 0, 0]
        ],
        [
          [6, 6, 0],
          [0, 6, 0],
          [0, 6, 0]
        ],
        [
          [0, 0, 6],
          [6, 6, 6],
          [0, 0, 0]
        ],
        [
          [0, 6, 0],
          [0, 6, 0],
          [0, 6, 6]
        ]
      ]
    },
    "i": {
      "startRow": -2,
      "startColumn": 4,
      "data": [
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [7, 7, 7, 7],
          [0, 0, 0, 0]
        ],
        [
          [0, 0, 7, 0],
          [0, 0, 7, 0],
          [0, 0, 7, 0],
          [0, 0, 7, 0]
        ]
      ]
    },
    
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
      "#94d82d", // S
      "#ff922b", // L
      "#66d9e8"  // I
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
