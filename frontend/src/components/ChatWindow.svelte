<script>
  import MessageBubble from "./MessageBubble.svelte";
  import ChatInput from "./ChatInput.svelte";
  import { messages, sessionId, loading } from "../stores/chatStore";
  import { sendMessage } from "../services/chatApi";

  let container;

  async function handleSend(text) {
    messages.update((m) => [...m, { sender: "user", text }]);
    loading.set(true);

    try {
      const res = await sendMessage(text, $sessionId);
      sessionId.set(res.sessionId);

      messages.update((m) => [...m, { sender: "ai", text: res.reply }]);
    } catch (e) {
      messages.update((m) => [
        ...m,
        { sender: "ai", text: "Error contacting server." },
      ]);
    } finally {
      loading.set(false);
      scrollToBottom();
    }
  }

  function scrollToBottom() {
    setTimeout(() => {
      container.scrollTop = container.scrollHeight;
    }, 0);
  }
</script>

<div class="chat">
  <div class="messages" bind:this={container}>
    {#each $messages as msg}
      <MessageBubble sender={msg.sender} text={msg.text} />
    {/each}
  </div>

  <ChatInput on:send={(e) => handleSend(e.detail)} />
</div>

<style>
  .chat {
    width: 400px;
    height: 500px;
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    padding: 10px;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }
</style>
