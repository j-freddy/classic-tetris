class Grid {
  constructor() {
    this.numRows = _DATA.grid.numRows;
    this.numColumns = _DATA.grid.numColumns;
    // Does not include current piece
    this.data = this.getBlankData();
  }

  getBlankData() {
    return Array(this.numRows).fill(Array(this.numColumns).fill(0));
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
