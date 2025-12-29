import express from "express";
import cors from "cors";
import "./db/client";
import chatRoutes from "./routes/chat.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/chat", chatRoutes);

export default app;
