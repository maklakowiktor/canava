export class Renderer {
  constructor(ctx) {
    this.ctx = ctx;
  }

  drawRect(x, y, w, h, color = 'white') {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);
  }

  drawText(text, x, y, size = '20px', color = 'white') {
    this.ctx.fillStyle = color;
    this.ctx.font = `${size} sans-serif`;
    this.ctx.fillText(text, x, y);
  }
}
