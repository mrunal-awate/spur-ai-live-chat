<script>
  import ChatWindow from "./components/ChatWindow.svelte";
</script>

<main>
  <h2>AI Support Chat</h2>
  <ChatWindow />
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Inter, system-ui, sans-serif;
    background: #f8fafc;
    color: #111827;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 600;
  }
</style>

