export const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
export const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
