import { Color, ColorEmpty } from "./color";

export class Box {
  constructor(id, color) {
    this.id = id;
    this.color = color;
  }
  setColor(name, hex) {
    this.color = new Color(name, hex);
  }
}

export class BoxEmpty extends Box {
  constructor(id) {
    super(id, new ColorEmpty());
  }
}
