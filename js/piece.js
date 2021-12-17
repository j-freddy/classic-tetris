class Piece {
  constructor(id) {
    this.data = data.piece[id];
    // Top left
    this.row = 0;
    this.column = 0;
    this.rotation = Rotation.DOWN;
  }

  getShape() {
    return this.data[this.rotation];
  }
}
