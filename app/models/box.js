import { color, colorEmpty } from "./color";

export class Box {
  constructor(id, color) {
    this.id = id;
    this.color = color;
  }
  setColor(name, hex) {
    this.color = new color(name, hex);
  }
}

export class BoxEmpty extends Box {
  constructor(id) {
    super(id, new colorEmpty());
  }
}
