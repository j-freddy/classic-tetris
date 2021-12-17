function update(game) {
  game.tick();
  GUI.draw(game);
  requestAnimationFrame(() => update(game));
}

window.onload = () => {
  console.log("Hello world!");
  const game = new Game();
  update(game);
}
