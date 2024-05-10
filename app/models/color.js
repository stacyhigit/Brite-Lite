export class Color {
  constructor(id, hex) {
    this.id = id;
    this.hex = hex;
  }
}

export class ColorEmpty extends Color {
  constructor() {
    super("empty", "#ffffff");
  }
}
