import sqlite3 from "sqlite3";
import path from "path";
import fs from "fs";

// Path to SQLite DB file
const dbPath = path.join(process.cwd(), "sqlite.db");

// Create DB connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Failed to connect to SQLite:", err.message);
  } else {
    console.log("✅ Connected to SQLite database");
  }
});

// Load and execute schema
const schemaPath = path.join(__dirname, "schema.sql");
const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema, (err) => {
  if (err) {
    console.error("❌ Failed to initialize DB schema:", err.message);
  } else {
    console.log("✅ Database schema initialized");
  }
});

export default db;
