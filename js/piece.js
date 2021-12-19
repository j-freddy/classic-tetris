class Piece {
  constructor(id) {
    const p = _DATA.piece[id]
    this.data = p.data;
    this.id = id;
    // Top left
    this.row = p.startRow;
    this.column = p.startColumn;
    this.rotation = Rotation.DOWN;
  }

  getShape() {
    return this.data[this.rotation];
  }

  rotateClockwise() {
    this.rotation++;
    this.rotation %= this.data.length;
  }

  rotateAntiClockwise() {
    this.rotation--;
    if (this.rotation == -1) {
      this.rotation += this.data.length;
    }
  }

  outOfBounds(grid) {
    let shape = this.getShape();

    // For each row
    for (let i = 0; i < shape.length; i++) {
      // For each column
      for (let j = 0; j < shape[i].length; j++) {
        if (shape[i][j] !== 0) {
          if (i + this.row < 0 || i + this.row > grid.numRows - 1
           || j + this.column < 0 || j + this.column > grid.numColumns - 1) {
             return true;
           }
        }
      }
    }

    return false;
  }

  collideWithGrid(grid) {
    let shape = this.getShape();

    // For each row
    for (let i = 0; i < shape.length; i++) {
      // For each column
      for (let j = 0; j < shape[i].length; j++) {
        let fill = shape[i][j];

        if (fill !== 0 && grid.data[i + this.row][j + this.column] !== 0) {
          return true;
        }
      }
    }

    return false;
  }

  // Moves down and returns true if possible, otherwise returns false
  tryMoveDown(grid) {
    this.row++;

    if (this.outOfBounds(grid) || this.collideWithGrid(grid)) {
      this.row--;
      return false;
    }

    return true;
  }

  // Moves left and returns true if possible, otherwise returns false
  tryMoveLeft(grid) {
    this.column--;

    if (this.outOfBounds(grid) || this.collideWithGrid(grid)) {
      this.column++;
      return false;
    }

    return true;
  }

  // Moves right and returns true if possible, otherwise returns false
  tryMoveRight(grid) {
    this.column++;

    if (this.outOfBounds(grid) || this.collideWithGrid(grid)) {
      this.column--;
      return false;
    }

    return true;
  }

  // Rotates clockwise and returns true if possible, otherwise returns false
  tryRotateClockwise(grid) {
    this.rotateClockwise();

    if (this.outOfBounds(grid) || this.collideWithGrid(grid)) {
      this.rotateAntiClockwise();
      return false;
    }

    return true;
  }

  // Rotates anti-clockwise and returns true if possible, otherwise returns
  // false
  tryRotateAntiClockwise(grid) {
    this.rotateAntiClockwise();

    if (this.outOfBounds(grid) || this.collideWithGrid(grid)) {
      this.rotateClockwise();
      return false;
    }

    return true;
  }
}
