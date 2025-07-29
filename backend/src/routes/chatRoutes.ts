import { Router } from "express";
import { protectRoute } from "../middleware/requireAuth";
import { createChat, deleteChat, getUserChats } from "../controllers/chatController";

const router = Router();

router.post("/", protectRoute, createChat);
router.get("/", protectRoute, getUserChats);
router.delete("/:id", protectRoute, deleteChat);

export default router;
