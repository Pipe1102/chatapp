import { Router } from "express";
import {
  createConversation,
  getConversationById,
  getConversationForUser,
} from "../controllers/conversation";
import { authenticateToken } from "../middleware";

const router = Router();
router.get("/", authenticateToken, getConversationForUser);
router.post("/", authenticateToken, createConversation);
router.get("/:id", authenticateToken, getConversationById);

export default router;
