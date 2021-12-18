// Default frame rate is 60 for JavaScript
const framesPerUpdate = 60 / _DATA.fps;
let frameCount = 0;

function update(game) {
  frameCount++;

  if (frameCount % framesPerUpdate === 0) {
    game.tick();
    GUI.draw(game);
  }

  requestAnimationFrame(() => update(game));
}

window.onload = () => {
  console.log("Hello world!");
  const game = new Game();
  GUI.startEventHandlers(game);
  update(game);
}
