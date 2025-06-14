import { Input } from './input.js';
import { AssetLoader } from './assetLoader.js';

const DPR = window.devicePixelRatio || 1;

export class Engine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.lastTime = 0;
    this.game = null;
    this.input = new Input();
    this.loader = new AssetLoader();

    // Масштабируем контекст, чтобы всё было чётко
    this.ctx.scale(DPR, DPR);
  }

  setGame(game) {
    this.game = game;
  }

  start() {
    requestAnimationFrame(this.loop.bind(this));
  }

  loop(time) {
    const delta = time - this.lastTime;
    this.lastTime = time;

    if (this.game) {
      this.game.update(delta);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.game.render(this.ctx);
    }

    requestAnimationFrame(this.loop.bind(this));
  }
}
