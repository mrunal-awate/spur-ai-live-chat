import { Router } from "express";
import { chatMessageController } from "../controllers/chat.controller";

const router = Router();

router.post("/message", chatMessageController);

export default router;
