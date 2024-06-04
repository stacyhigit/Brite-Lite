import * as SQLite from "expo-sqlite/next";
import { Color } from "../models/color";
import { Box } from "../models/box";

const databaseName = "briteLite.db";

const boxesInsertStatement =
  "INSERT INTO boxes (box_index, color_id, color_hex, board_id ) VALUES ($box_index, $color_id, $color_hex, $board_id)";

async function openDatabase() {
  const db = await SQLite.openDatabaseAsync(databaseName, {
    useNewConnection: true,
  });
  await db.execAsync("PRAGMA foreign_keys = ON");
  return db;
}

export async function initDatabase() {
  const DATABASE_VERSION = 2;
  const db = await openDatabase();
  try {
    let { user_version } = await db.getFirstAsync("PRAGMA user_version");
    if (user_version !== 2) {
      await db.execAsync(`DROP TABLE IF EXISTS boards`);
      await db.execAsync(`DROP TABLE IF EXISTS boxes`);
      await db.execAsync(`DROP TABLE IF EXISTS colors`);
      await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    }

    return await db.execAsync(
      `PRAGMA foreign_keys = ON;
			CREATE TABLE IF NOT EXISTS boards (
				id INTEGER PRIMARY KEY NOT NULL,
				imagePath TEXT NOT NULL,
				rowCount INTEGER NOT NULL,
				columnCount INTEGER NOT NULL);
			CREATE TABLE IF NOT EXISTS boxes (
				box_index INTEGER NOT NULL,
				color_id TEXT NOT NULL,
				color_hex TEXT NOT NULL,
				board_id INTEGER NOT NULL,
				PRIMARY KEY (box_index, board_id)
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

export async function saveBoard(imagePath, boxes, board) {
  if (board.id) {
    await deleteBoard(board.id);
  }
  return insertBoard(imagePath, boxes, board);
}

async function insertBoard(imagePath, boxes, board) {
  const db = await openDatabase();
  const insertBoxes = await db.prepareAsync(boxesInsertStatement);
  try {
    let resBoard = await db.runAsync(
      "INSERT INTO boards (imagePath, rowCount, columnCount) VALUES (?,?,?)",
      imagePath,
      board.rowCount,
      board.columnCount
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

export async function deleteBoard(id) {
  const db = await openDatabase();
  try {
    await db.runAsync("DELETE FROM boards WHERE id = ?", id);
  } catch (error) {
    console.log("error deleteBoard:", error);
  } finally {
    db.closeAsync();
  }
}

export async function deleteBoards(ids) {
  const mask = Array(ids.size).fill("?").join();

  const db = await openDatabase();
  const statement = await db.prepareAsync(
    `DELETE FROM boards WHERE id IN (${mask})`
  );
  try {
    return await statement.executeAsync(Array.from(ids));
  } catch (error) {
    console.log("error deleteBoards", error);
  } finally {
    db.closeAsync();
  }
}

export async function getAllBoards() {
  const db = await openDatabase();
  try {
    return await db.getAllAsync("SELECT * FROM boards ORDER BY id DESC");
  } catch (error) {
    console.log("error getAllBoards", error);
  } finally {
    db.closeAsync();
  }
}

export async function getBoxes(id) {
  const db = await openDatabase();
  try {
    const boxes = await db.getAllAsync(
      "SELECT * FROM boxes WHERE board_id = ?",
      id
    );
    return boxes.map((box) => {
      return new Box(box.box_index, new Color(box.color_id, box.color_hex));
    });
  } catch (error) {
    console.log("error getBoxes", error);
  } finally {
    db.closeAsync();
  }
}
