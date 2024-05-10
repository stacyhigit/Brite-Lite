import * as SQLite from "expo-sqlite/next";

const databaseName = "briteLite.db";

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
  	box_id INTEGER NOT NULL,
  	color_name TEXT NOT NULL,
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
  console.log("delete");
  const db = await openDatabase();
  try {
    await db.runAsync("DELETE FROM colors");
  } catch (error) {
    console.log("error deleteAllColors:", error);
  } finally {
    db.closeAsync();
  }
}
