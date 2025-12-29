import { writable } from "svelte/store";

export const messages = writable<
  { sender: "user" | "ai"; text: string }[]
>([]);

export const sessionId = writable<string | null>(null);

export const loading = writable(false);
