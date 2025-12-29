const API_URL = "http://localhost:5000/chat/message";

export async function sendMessage(
  message: string,
  sessionId?: string | null
) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }

  return res.json();
}
