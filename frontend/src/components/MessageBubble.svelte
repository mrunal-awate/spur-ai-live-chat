<script>
  import { fade, slide } from "svelte/transition";
  export let sender;
  export let text;
</script>

<div
  class="bubble {sender}"
  in:fly={{ y: 6, duration: 200, opacity: 0 }}
>
  {text}
</div>

<style>
  .bubble {
    max-width: 75%;
    padding: 10px 14px;
    margin: 6px 0;
    border-radius: 14px;
    line-height: 1.5;
    font-size: 14px;
    word-wrap: break-word;
  }

  .user {
    background: linear-gradient(135deg, #2563eb, #1d4ed8);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }

  .ai {
    background: #e5e7eb;
    color: #111;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
</style>
