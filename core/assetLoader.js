export class AssetLoader {
  constructor() {
    this.images = new Map();
    this.sounds = new Map();
  }

  loadImage(key, src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.images.set(key, img);
        resolve();
      };
    });
  }

  getImage(key) {
    return this.images.get(key);
  }

  loadSound(key, src) {
    return new Promise((resolve) => {
      const audio = new Audio(src);
      audio.onloadeddata = () => {
        this.sounds.set(key, audio);
        resolve();
      };
    });
  }

  getSound(key) {
    return this.sounds.get(key);
  }

  async loadAll(assets) {
    const promises = [];

    for (const [key, src] of Object.entries(assets.images || {})) {
      promises.push(this.loadImage(key, src));
    }

    for (const [key, src] of Object.entries(assets.sounds || {})) {
      promises.push(this.loadSound(key, src));
    }

    return Promise.all(promises);
  }
}
