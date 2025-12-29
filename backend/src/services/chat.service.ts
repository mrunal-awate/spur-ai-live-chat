import {
  createConversation,
  getConversation,
} from "../repositories/conversation.repo";
import {
  saveMessage,
  getMessages,
} from "../repositories/message.repo";

export async function handleChatMessage(
  message: string,
  sessionId?: string
) {
  let conversationId = sessionId;

  // Create conversation if needed
  if (!conversationId || !(await getConversation(conversationId))) {
    conversationId = await createConversation();
  }

  // Save user message
  await saveMessage(conversationId, "user", message);

  // 🔹 TEMP AI RESPONSE (mock)
  const aiReply = "Thanks for your message! Our support agent will assist you shortly.";

  // Save AI message
  await saveMessage(conversationId, "ai", aiReply);

  return {
    reply: aiReply,
    sessionId: conversationId,
  };
}
