import { Engine } from './core/engine.js';
import { SnakeGame } from './games/snake.js';

const canvas = document.getElementById('canvas');

const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
const DPI = window.devicePixelRatio || 1;
// const SCALE_FACTOR = 4.0;

console.log("DPI = ", DPI);

canvas.width = WINDOW_WIDTH * DPI //  * (1 / SCALE_FACTOR);
canvas.height = WINDOW_HEIGHT * DPI // * (1 / SCALE_FACTOR);

// CSS-стили для отображения (в обычных пикселях)
canvas.style.width = WINDOW_WIDTH + 'px';
canvas.style.height = WINDOW_HEIGHT + 'px';


const engine = new Engine(canvas);
const game = new SnakeGame(engine);

engine.setGame(game);
engine.start();
