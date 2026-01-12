🧠 Spur – AI Live Chat Support Agent

A mini AI-powered live chat system that simulates a customer support agent, built as part of the Spur Founding Full-Stack Engineer assignment.

This project demonstrates:

1. Clean backend architecture

2. Real LLM integration

3. Persistent conversations

4. A simple but usable chat UI

5. Production-style error handling

🚀 **Features**

💬 Live chat interface (user ↔ AI)

🧠 AI replies using a real LLM (via OpenRouter)

🗂️ Persistent conversations & messages

🔁 Session-based chat continuity

⚠️ Graceful error handling

🧱 Clean separation of concerns (routes / services / DB)

🏗️ **Tech Stack**

*Backend*

1. Node.js

2. TypeScript

3. Express

4. SQLite

5. OpenAI SDK (via OpenRouter)

*Frontend*

1. Svelte

2. Vite

3. Fetch API


📐 **High-Level Architecture**

Browser (Svelte UI)
        │
        ▼
POST /chat/message
        │
        ▼
Express Controller
        │
        ▼
Chat Service
 ├─ Conversation Repository
 ├─ Message Repository
 └─ LLM Service (OpenRouter)
        │
        ▼
SQLite Database


**Key Design Principles**

Frontend is stateless (UI only)

Backend owns all logic

LLM logic is isolated and easily swappable

Database-first design for reliability


🗄️ **Database Schema**
conversations

| Field      | Type        | Description             |
| ---------- | ----------- | ----------------------- |
| id         | TEXT (UUID) | Conversation/session ID |
| created_at | DATETIME    | Creation time           |

messages

| Field           | Type     | Description     |
| --------------- | -------- | --------------- |
| id              | INTEGER  | Auto-increment  |
| conversation_id | TEXT     | Foreign key     |
| sender          | TEXT     | `user` or `ai`  |
| text            | TEXT     | Message content |
| created_at      | DATETIME | Timestamp       |


🔁 **Chat Flow (End-to-End)**

1. User types a message in the UI

2. Frontend sends POST /chat/message

3. Backend:

    a. Validates input

    b. Creates / finds conversation

    c. Stores user message

    d. Fetches conversation history

    e. Calls LLM

    f. Stores AI reply

4. AI response is returned and rendered



🤖 **LLM Integration**

1. Provider: OpenRouter

2. SDK: OpenAI-compatible SDK

3. Model: openai/gpt-4o-mini

Prompt Strategy

1. System prompt defines AI as a support agent

2. Store policies are embedded in the prompt

3. Recent chat history is included for context

Guardrails

1. Max token limit

2. Try/catch around LLM calls

3. Friendly fallback message on failure


🛡️ **Robustness & Validation**

1. Rejects empty messages

2. Safe request body validation

3. Backend never crashes on bad input

4. Clean user-facing error messages

5. No secrets committed to GitHub

▶️ **How to Run Locally**
1️⃣ **Clone the repository**
git clone https://github.com/mrunal-awate/spur-ai-live-chat.git
cd spur-ai-live-chat

2️⃣ **Backend setup**
cd backend
npm install

Create .env file:
PORT=5000
OPENAI_API_KEY=your_openrouter_or_openai_key
DATABASE_URL=sqlite.db


Run backend:
npm run dev

3️⃣ **Frontend setup**
cd ../frontend
npm install
npm run dev

Open in browser:
http://localhost:5173


🧠 **Architectural Decisions**

1. SQLite chosen for simplicity and speed

2. Repository pattern used for DB isolation

3. Service layer contains all business logic

4. LLM service is fully encapsulated

5. Session-based chat avoids auth complexity


⚖️ **Trade-offs**

1. No authentication (out of scope)

2. No streaming responses (kept simple)

3. Minimal UI styling (focus on functionality)

4. Single conversation per session


🔮 **If I Had More Time…**

1. Add streaming AI responses.

2. Fetch and render chat history on reload

3. Improve UI animations & mobile responsiveness

4. Add unit tests for services

5. Add Redis for caching recent conversations