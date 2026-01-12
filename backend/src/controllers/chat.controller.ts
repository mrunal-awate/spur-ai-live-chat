import { Request, Response } from "express";
import { handleChatMessage } from "../services/chat.service";

export async function chatMessageController(                // controller to handle chat message
  req: Request,                                             // request object
  res: Response                                     // response object      
) {
  try {
    const body = req.body;                   // extract body from request     

    if (!body || typeof body.message !== "string") {
        return res.status(400).json({ error: "Invalid request body" });     // validate request body              
    }

    const { message, sessionId } = req.body;                                        // extract message and sessionId from body

    if (!message || message.trim() === "") {
      return res.status(400).json({ error: "Message cannot be empty" });            // validate message content         
    }

    const result = await handleChatMessage(message, sessionId);        // handle chat message and get result  

    res.json(result);
  } catch (error) {
  console.error("🔥 CHAT ERROR FULL:", error);                  // message 
  return res.status(500).json({
    error: "Something went wrong. Please try again.",
  });
}

}
