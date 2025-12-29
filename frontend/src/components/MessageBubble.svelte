<script>
  export let sender;
  export let text;
</script>

<div class="bubble {sender}">
  {text}
</div>

<style>
  .bubble {
    max-width: 70%;
    padding: 10px;
    margin: 6px 0;
    border-radius: 10px;
    line-height: 1.4;
  }

  .user {
    background: #2563eb;
    color: white;
    align-self: flex-end;
  }

  .ai {
    background: #e5e7eb;
    color: #111;
    align-self: flex-start;
  }
</style>
