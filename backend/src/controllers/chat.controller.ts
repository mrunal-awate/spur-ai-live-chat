import { Request, Response } from "express";
import { handleChatMessage } from "../services/chat.service";

export async function chatMessageController(
  req: Request,
  res: Response
) {
  try {
    const body = req.body;

    if (!body || typeof body.message !== "string") {
        return res.status(400).json({ error: "Invalid request body" });
    }

    const { message, sessionId } = req.body;

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });
    }

    const result = await handleChatMessage(message, sessionId);

    res.json(result);
  } catch (error) {
  console.error("🔥 CHAT ERROR FULL:", error);
  return res.status(500).json({
    error: "Something went wrong. Please try again.",
  });
}

}
