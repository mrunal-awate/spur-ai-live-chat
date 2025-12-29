import OpenAI from "openai";

export async function generateAIReply(
  history: { sender: string; text: string }[],
  userMessage: string
): Promise<string> {
  try {
    // 🔥 Create client INSIDE function
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const messages = [
      {
        role: "system",
        content:
          "You are a helpful customer support agent for a small e-commerce store. Answer clearly and concisely.",
      },
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: userMessage },
    ];

    const response = await client.chat.completions.create(
      {
        model: "openai/gpt-4o-mini",
        messages: messages as any,
        max_tokens: 150,
        temperature: 0.3,
      } as any
    );

    return (
      response.choices[0]?.message?.content ??
      "Sorry, I couldn’t generate a response right now."
    );
  } catch (error) {
    console.error("LLM error:", error);
    return "Sorry, I’m having trouble responding right now.";
  }
}
