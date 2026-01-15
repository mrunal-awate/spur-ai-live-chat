// import sqlite3 from "sqlite3";
// import path from "path";
// import fs from "fs";

// // Path to SQLite DB file
// const dbPath = path.join(process.cwd(), "sqlite.db");

// // Create DB connection
// const db = new sqlite3.Database(dbPath, (err) => {
//   if (err) {
//     console.error("❌ Failed to connect to SQLite:", err.message);
//   } else {
//     console.log("✅ Connected to SQLite database");
//   }
// });

// // Load and execute schema
// const schemaPath = path.join(__dirname, "schema.sql");
// const schema = fs.readFileSync(schemaPath, "utf-8");

// db.exec(schema, (err) => {
//   if (err) {
//     console.error("❌ Failed to initialize DB schema:", err.message);
//   } else {
//     console.log("✅ Database schema initialized");
//   }
// });

// export default db;



import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";

const dbPath = process.env.DATABASE_URL || "sqlite.db";

// Always point to schema in src (works in dev + prod)
const schemaPath = path.join(
  process.cwd(),
  "src",
  "db",
  "schema.sql"
);

const schema = fs.readFileSync(schemaPath, "utf8");                                 // read schema file

const db = new sqlite3.Database(dbPath);

db.exec(schema, (err) => {
  if (err) {
    console.error("❌ Failed to initialize database schema", err);
  } else {
    console.log("✅ Database schema initialized");
  }
});

export default db;
