import { color, colorEmpty } from "./color";

export class Box {
  constructor(row, column, color) {
    this.row = row;
    this.column = column;
    this.color = color;
    this.id = `${column}.${row}`;
  }
  setColor(name, hex) {
    this.color = new color(name, hex);
  }
}

export class BoxEmpty extends Box {
  constructor(row, column) {
    super(row, column, new colorEmpty());
  }
}
