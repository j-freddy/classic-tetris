// Default frame rate is 60 for JavaScript
const framesPerUpdate = 60 / _DATA.fps;
let frameCount = 0;

function update(game) {
  frameCount++;

  if (frameCount % framesPerUpdate === 0) {
    game.tick();
    GUI.draw(game);
    GUI.updateTextInterface(game);
  }

  requestAnimationFrame(() => update(game));
}

window.onload = () => {
  const game = new Game(18);
  GUI.startEventHandlers(game);
  update(game);
}
