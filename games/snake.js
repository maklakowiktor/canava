import { Renderer } from '../core/renderer.js';
import { randInt } from '../core/math2d.js';
import { Physics } from '../core/physics.js';

export class SnakeGame {
  constructor(engine) {
    this.engine = engine;
    this.renderer = new Renderer(engine.ctx);
    this.snake = [{ x: 5, y: 5 }];
    this.speed = 0.25;
    this.dir = { x: 1*this.speed, y: 0 };
    this.food = { 
      x: randInt(0, 19), 
      y: randInt(0, 19),
    };
    this.cellSize = 20;
    this.cols = 40;
    this.rows = 30;
    this.timer = 0;

    this.assetsLoaded = false;

    this._loadAssets();

    document.addEventListener('keydown', this.handleInput.bind(this));
  }

  _loadAssets() {
    const loader = this.engine.loader;
    if (loader.images.size === 0 || loader.images.sounds.size === 0) {
      try {
        loader
          .loadAll({
            images: {
              apple: './assets/images/apple.png',
            },
            sounds: {
              eat: './assets/sounds/apple-bite.wav',
            }
          })
          .then((_) => {
            this.assetsLoaded = true;
            console.log('assets loaded');
          });
      } catch (err) {
        throw Exception("failed to load assets");
      }
    }
  }

  handleInput(e) {
    const key = e.key;
    if (key === 'ArrowUp') this.dir = { x: 0, y: -1 * this.speed };
    else if (key === 'ArrowDown') this.dir = { x: 0, y: 1 * this.speed };
    else if (key === 'ArrowLeft') this.dir = { x: -1 * this.speed , y: 0 };
    else if (key === 'ArrowRight') this.dir = { x: 1 * this.speed, y: 0 };
  }

  update(delta) {
    this.timer += delta;
    if (this.timer > 1000/60) {
      this.timer = 0;
      const head = {
        x: (this.snake[0].x + this.dir.x + this.cols) % this.cols,
        y: (this.snake[0].y + this.dir.y + this.rows) % this.rows,
      };
      this.dir = { x: 0, y: 0 };

      if (head.x === this.food.x && head.y === this.food.y) {
        this.snake.unshift(head);
        this.food = { 
          x: randInt(0, this.cols - 1), 
          y: randInt(0, this.rows - 1)
        };
        this.speed += this.speed * 0.01;
        
        const biteSound = this.engine.loader.getSound('eat');
        if (biteSound) {
          // Клонируем, чтобы можно было играть одновременно несколько звуков
          const sound = biteSound.cloneNode();
          sound.play().catch(e => console.warn("Can't play sound:", e));
        }
      } else {
        this.snake.pop();
        this.snake.unshift(head);
      }
    }
  }

  async render(ctx) {
    // Grid background
    this.renderer.drawRect(0, 0, this.engine.canvas.width, this.engine.canvas.height, '#222');

    if (!this.assetsLoaded) {
      // TODO: draw loading screen
      ctx.font = "48px serif";
      ctx.fillStyle = 'white';
      // FIXME: align by center
      ctx.fillText("Loading assets...", this.engine.canvas.width / 4, this.engine.canvas.height / 4);
      // this.renderer.drawRect(this.cellSize, this.cellSize, this.cellSize, this.cellSize, 'lime');
      return;
    }

    // Snake
    for (const segment of this.snake) {
      this.renderer.drawRect(segment.x * this.cellSize, segment.y * this.cellSize, this.cellSize, this.cellSize, 'lime');
    }

    // Food
    // this.renderer.drawRect(this.food.x * this.cellSize, this.food.y * this.cellSize, this.cellSize, this.cellSize, 'red');
  
    const appleImage = this.engine.loader.getImage('apple');
    if (appleImage) {
      ctx.drawImage(
        appleImage,
        this.food.x * this.cellSize,
        this.food.y * this.cellSize,
        this.cellSize,
        this.cellSize
      );
    } else {
      // fallback если нет картинки
      this.renderer.drawRect(this.food.x * this.cellSize, this.food.y * this.cellSize, this.cellSize, this.cellSize, 'red');
    }

  }
}
