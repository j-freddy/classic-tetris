window.onload = () => {
  console.log("Hello world!");

  const piece = new Piece(PieceID.T);
  const grid = new Grid();
  grid.currentPiece = piece;
  console.log(grid.getDataWithCurrentPiece());
  console.log(grid.data);
}
