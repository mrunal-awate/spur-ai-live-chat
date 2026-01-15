import db from "../db/client";

export function saveMessage(
  conversationId: string,
  sender: "user" | "ai",
  text: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO messages (conversation_id, sender, text)
       VALUES (?, ?, ?)`,
      [conversationId, sender, text],
      (err) => {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

export function getMessages(conversationId: string) {                           // fetch messages by conversationId
  return new Promise<any[]>((resolve, reject) => {
    db.all(
      `SELECT sender, text FROM messages
       WHERE conversation_id = ?
       ORDER BY created_at ASC`,
      [conversationId],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
}
