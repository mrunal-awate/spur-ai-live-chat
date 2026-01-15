import { Router } from "express";
import { chatMessageController } from "../controllers/chat.controller";

const router = Router();

router.post("/message", chatMessageController);      // POST /chat/message to handle chat messages                                      

export default router;
