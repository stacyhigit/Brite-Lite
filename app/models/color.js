export class color {
  constructor(name, hex) {
    this.name = name;
    this.hex = hex;
  }
}

export class colorEmpty extends color {
  constructor() {
    super("empty", "#ffffff");
  }
}
