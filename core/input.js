export class Input {
  constructor() {
    this.keys = new Set();
    this.mouse = { x: 0, y: 0, down: false };

    window.addEventListener('keydown', (e) => this.keys.add(e.key));
    window.addEventListener('keyup', (e) => this.keys.delete(e.key));

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', () => this.mouse.down = true);
    window.addEventListener('mouseup', () => this.mouse.down = false);
  }

  isKeyDown(key) {
    return this.keys.has(key);
  }

  isMouseDown() {
    return this.mouse.down;
  }

  getMousePos() {
    return { x: this.mouse.x, y: this.mouse.y };
  }
}
