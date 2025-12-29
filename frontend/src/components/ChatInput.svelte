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
  }

  input {
    flex: 1;
    padding: 10px;
  }

  button {
    padding: 10px 16px;
  }
</style>
