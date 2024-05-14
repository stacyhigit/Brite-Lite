import * as SQLite from "expo-sqlite/next";

const databaseName = "briteLite.db";

const boxesInsertStatement =
  "INSERT INTO boxes (box_index, color_id, color_hex, board_id ) VALUES ($box_index, $color_id, $color_hex, $board_id)";

async function openDatabase() {
  return await SQLite.openDatabaseAsync(databaseName, {
    useNewConnection: true,
  });
}

export async function initDatabase() {
  const db = await openDatabase();
  try {
    return await db.execAsync(
      `PRAGMA foreign_keys = ON;
			CREATE TABLE IF NOT EXISTS boards (
				id INTEGER PRIMARY KEY NOT NULL,
				name TEXT NOT NULL,
				rowCount INTEGER NOT NULL,
				columnCount INTEGER NOT NULL,
				isActive INTEGER);
			CREATE TABLE IF NOT EXISTS boxes (
				id INTEGER PRIMARY KEY NOT NULL,
				box_index INTEGER NOT NULL,
				color_id TEXT NOT NULL,
				color_hex TEXT NOT NULL,
				board_id INTEGER NOT NULL,
				FOREIGN KEY(board_id) REFERENCES boards(id)
				ON DELETE CASCADE);
			CREATE TABLE IF NOT EXISTS colors (
				id INTEGER PRIMARY KEY NOT NULL,
				hex TEXT NOT NULL)`
    );
  } catch (error) {
    console.log("error initDatabase", error);
  } finally {
    db.closeAsync();
  }
}

export async function insertColor(hex) {
  const db = await openDatabase();
  try {
    return await db.runAsync("INSERT INTO colors (hex) VALUES (?)", hex);
  } catch (error) {
    console.log("error insertColor", error);
  } finally {
    db.closeAsync();
  }
}

export async function getAllColors() {
  const db = await openDatabase();
  try {
    return await db.getAllAsync("SELECT * FROM colors ORDER BY id DESC");
  } catch (error) {
    console.log("error getAllColors", error);
  } finally {
    db.closeAsync();
  }
}

export async function deleteColor(id) {
  const db = await openDatabase();
  try {
    await db.runAsync("DELETE FROM colors WHERE id = ?", id);
  } catch (error) {
    console.log("error deleteColor:", error);
  } finally {
    db.closeAsync();
  }
}

export async function deleteAllColors() {
  const db = await openDatabase();
  try {
    await db.runAsync("DELETE FROM colors");
  } catch (error) {
    console.log("error deleteAllColors:", error);
  } finally {
    db.closeAsync();
  }
}

export async function insertBoard(boxes, board) {
  const db = await openDatabase();
  const insertBoxes = await db.prepareAsync(boxesInsertStatement);
  try {
    let resBoard = await db.runAsync(
      "INSERT INTO boards (name, rowCount, columnCount, isActive) VALUES (?,?,?,?)",
      "test",
      board.rowCount,
      board.columnCount,
      0
    );

    for (const box of boxes) {
      await insertBoxes.executeAsync({
        $box_index: box.index,
        $color_id: box.color.id,
        $color_hex: box.color.hex,
        $board_id: resBoard.lastInsertRowId,
      });
    }

    return resBoard.lastInsertRowId;
  } catch (error) {
    console.log("error insertBoard", error);
  } finally {
    try {
      await insertBoxes.finalizeAsync();
    } catch (error) {
      console.log("error insertBoard", error);
    }
    db.closeAsync();
  }
}

export async function updateBoard(boxes, boardId) {
  const db = await openDatabase();
  const insertBoxes = await db.prepareAsync(boxesInsertStatement);

  try {
    await db.runAsync("DELETE FROM boxes WHERE board_id = ?", boardId);

    for (const box of boxes) {
      await insertBoxes.executeAsync({
        $box_index: box.index,
        $color_id: box.color.id,
        $color_hex: box.color.hex,
        $board_id: boardId,
      });
    }
    return;
  } catch (error) {
    console.log("error insertBoard", error);
  } finally {
    try {
      await insertBoxes.finalizeAsync();
    } catch (error) {
      console.log("error updateBoard", error);
    }
    db.closeAsync();
  }
}

export async function getAllBoards() {
  const db = await openDatabase();
  try {
    return await db.getAllAsync("SELECT * FROM boards");
  } catch (error) {
    console.log("error getAllBoards", error);
  } finally {
    db.closeAsync();
  }
}

export async function getAllBoxes() {
  const db = await openDatabase();
  try {
    return await db.getAllAsync("SELECT * FROM boxes");
  } catch (error) {
    console.log("error getAllBoxes", error);
  } finally {
    db.closeAsync();
  }
}
