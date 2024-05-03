export class Color {
  constructor(name, hex) {
    this.name = name;
    this.hex = hex;
  }
}

export class ColorEmpty extends Color {
  constructor() {
    super("empty", "#ffffff");
  }
}
