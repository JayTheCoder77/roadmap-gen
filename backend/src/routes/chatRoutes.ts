import express from "express";
import {
  createChat,
  getUserChats,
  getSingleChat,
  deleteChat,
  deleteAllChats,
} from "../controllers/chatController";
import { protectRoute } from "../middleware/requireAuth";

const router = express.Router();

router.post("/", protectRoute, createChat);
router.get("/", protectRoute, getUserChats);
router.get("/:id", protectRoute, getSingleChat);
router.delete("/:id", protectRoute, deleteChat);
router.delete("/", protectRoute, deleteAllChats);

export default router;
