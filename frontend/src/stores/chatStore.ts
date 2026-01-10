import { writable } from "svelte/store";        // this is svelte store

export const messages = writable<               // this is message store
  { sender: "user" | "ai"; text: string }[]     // array of objects
>([]);

export const sessionId = writable<string | null>(null);

export const loading = writable(false);
