class Grid {
  constructor() {
    this.numRows = data.grid.numRows;
    this.numColumns = data.grid.numColumns;
    // Does not include current piece
    this.data = this.getBlankData();
    this.currentPiece = null;
  }

  getBlankData() {
    return Array(this.numRows).fill(Array(this.numColumns).fill(0));
  }

  getDataWithCurrentPiece() {
    // Clone current data
    let data = this.data.map(row => row.slice());
    let shape = this.currentPiece.getShape();

    // For each row
    for (let i = 0; i < shape.length; i++) {
      // For each column
      for (let j = 0; j < shape[i].length; j++) {
        let fill = shape[i][j];
        if (fill !== 0) {
          data[i + this.currentPiece.row][j + this.currentPiece.column] = fill;
        }
      }
    }

    return data;
  }
}
