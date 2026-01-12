import express from "express";
import cors from "cors";
import "./db/client";
import chatRoutes from "./routes/chat.routes";

const app = express();                // create express app

app.use(cors());                       // enable CORS
app.use(express.json());            // parse JSON request bodies

app.use("/chat", chatRoutes);       // use chat routes

export default app;
