export class Board {
  constructor(id = null, imagePath = "", columnCount = 0, rowCount = 0) {
    this.id = id;
    this.imagePath = imagePath;
    this.columnCount = columnCount;
    this.rowCount = rowCount;
  }
}

export class BoardEmpty extends Board {
  constructor(columnCount, rowCount) {
    super(null, "", columnCount, rowCount);
  }
}
