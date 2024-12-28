import sqlite3 from "sqlite3"
sqlite3.verbose()
import path from "path";

import { fileURLToPath } from "url";

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new sqlite3.Database(
  path.resolve(__dirname, "../database/appointments.db")
);

//Creating the DB
db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        date TEXT NOT NULL,
        time_slot TEXT NOT NULL,
        UNIQUE(date, time_slot)
      );
    `);
});

export default db