class Grid {
  constructor() {
    this.numRows = _DATA.grid.numRows;
    this.numColumns = _DATA.grid.numColumns;
    // Does not include current piece
    this.data = this.getBlankData();
  }

  getBlankRow() {
    return Array(this.numColumns).fill(0);
  }

  getBlankData() {
    return Array(this.numRows).fill(this.getBlankRow());
  }

  isRowFilled(row) {
    for (let cell of row) {
      if (cell === 0) {
        return false;
      }
    }
    return true;
  }

  isToppedOut() {
    // ----XX----
    // If either of the cells marked X is not empty, grid is topped out
    let i = Math.floor(this.numColumns / 2);
    let j = i + 1;
    
    return this.data[0][i] !== 0 || this.data[0][j] !== 0;
  }

  // Returns true if lines are cleared, false otherwise
  removeFilledLines() {
    let lineClears = false;
    this.data = this.data.filter(row => !this.isRowFilled(row));

    while (this.data.length < this.numRows) {
      this.data.unshift(this.getBlankRow());
      lineClears = true;
    }

    return lineClears;
  }

  getDataWithCurrentPiece(piece) {
    // Clone current data
    let data = this.data.map(row => row.slice());
    let shape = piece.getShape();

    // For each row
    for (let i = 0; i < shape.length; i++) {
      // For each column
      for (let j = 0; j < shape[i].length; j++) {
        let fill = shape[i][j];
        if (fill !== 0) {
          data[i + piece.row][j + piece.column] = fill;
        }
      }
    }

    return data;
  }

  addPieceToData(piece) {
    this.data = this.getDataWithCurrentPiece(piece);
  }
}
