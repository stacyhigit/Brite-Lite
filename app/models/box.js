import { Color, ColorEmpty } from "./color";

export class Box {
  constructor(index, color) {
    this.index = index;
    this.color = color;
  }
  setColor(name, hex) {
    this.color = new Color(name, hex);
  }
}

export class BoxEmpty extends Box {
  constructor(index) {
    super(index, new ColorEmpty());
  }
}
