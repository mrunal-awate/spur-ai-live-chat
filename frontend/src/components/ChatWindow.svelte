<script>
  import MessageBubble from "./MessageBubble.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { messages, sessionId, loading } from "../stores/chatStore";
  import { sendMessage } from "../services/chatApi";
  import { onMount } from "svelte";

  let container;

  // Welcome message (only once)
  onMount(() => {
    messages.update((m) =>
      m.length === 0
        ? [{ sender: "ai", text: "Hi! 👋 How can I help you today?" }]
        : m
    );
  });

  async function handleSend(text) {
    messages.update((m) => [...m, { sender: "user", text }]);
    loading.set(true);
    scrollToBottom();

    try {
      const res = await sendMessage(text, $sessionId);
      sessionId.set(res.sessionId);

      messages.update((m) => [...m, { sender: "ai", text: res.reply }]);
    } catch (e) {
      messages.update((m) => [
        ...m,
        { sender: "ai", text: "⚠️ Sorry, I couldn’t reach the server." },
      ]);
    } finally {
      loading.set(false);
      scrollToBottom();
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }, 50);
  }
</script>

<div class="chat">
  <!-- Header -->
  <div class="header">
    AI Support Chat
  </div>

  <!-- Messages -->
  <div class="messages" bind:this={container}>
    {#each $messages as msg}
      <MessageBubble sender={msg.sender} text={msg.text} />
    {/each}

    {#if $loading}
      <div class="typing">AI is typing…</div>
    {/if}
  </div>

  <!-- Input -->
  <ChatInput on:send={(e) => handleSend(e.detail)} />
</div>

<style>
  .chat {
    width: 380px;
    height: 520px;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 14px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .header {
    padding: 12px;
    text-align: center;
    font-weight: 600;
    font-size: 15px;
    background: #2563eb;
    color: white;
  }

  .messages {
    flex: 1;
    padding: 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    background: #f9fafb;
  }

  .typing {
    font-size: 13px;
    color: #6b7280;
    font-style: italic;
    margin: 6px 0;
  }
</style>
