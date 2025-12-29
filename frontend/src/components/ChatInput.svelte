<script>
  import { loading } from "../stores/chatStore";
  import { createEventDispatcher } from "svelte";

  let text = "";
  const dispatch = createEventDispatcher();

  function send() {
    if (!text.trim()) return;
    dispatch("send", text);
    text = "";
  }
</script>

<div class="input">
  <input
    placeholder="Type your message..."
    bind:value={text}
    on:keydown={(e) => e.key === "Enter" && send()}
    disabled={$loading}
  />
  <button on:click={send} disabled={$loading}>Send</button>
</div>

<style>
  .input {
    display: flex;
    gap: 8px;
    padding: 10px;
    border-top: 1px solid #e5e7eb;
  }

  input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #d1d5db;
    font-size: 14px;
  }

  input:disabled {
    background: #f3f4f6;
  }

  button {
    padding: 10px 16px;
    border-radius: 10px;
    background: #2563eb;
    color: white;
    border: none;
    font-weight: 500;
    cursor: pointer;
  }

  button:disabled {
    background: #93c5fd;
    cursor: not-allowed;
  }
</style>

