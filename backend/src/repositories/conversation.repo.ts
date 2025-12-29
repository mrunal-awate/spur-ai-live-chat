import db from "../db/client";

// Simple UUID generator (safe & dependency-free)
function generateId(): string {
  return "xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function createConversation(): Promise<string> {
  const id = generateId();

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO conversations (id) VALUES (?)",
      [id],
      (err) => {
        if (err) reject(err);
        else resolve(id);
      }
    );
  });
}

export function getConversation(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    db.get(
      "SELECT id FROM conversations WHERE id = ?",
      [id],
      (err, row) => {
        if (err) reject(err);
        else resolve(!!row);
      }
    );
  });
}
