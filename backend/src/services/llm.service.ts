import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Store knowledge (seed data)
const STORE_CONTEXT = `
You are a helpful customer support agent for a small e-commerce store.

Store Policies:
- Shipping: We ship within India and internationally. Orders are delivered in 5–7 business days.
- Returns: Returns are accepted within 7 days of delivery if the item is unused.
- Refunds: Refunds are processed within 5 business days after return approval.
- Support Hours: Monday to Friday, 9 AM to 6 PM IST.

Answer clearly, politely, and concisely.
`;

export async function generateAIReply(
  history: { sender: string; text: string }[],
  userMessage: string
): Promise<string> {
  try {
    const messages = [
      { role: "system", content: STORE_CONTEXT },

      // Include conversation history
      ...history.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),

      { role: "user", content: userMessage },
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 150,
      temperature: 0.3,
    });

    return (
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error) {
    console.error("LLM error:", error);
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}
