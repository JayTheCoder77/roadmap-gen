import { Router } from "express";
import { protectRoute } from "../middleware/requireAuth";

const router = Router();

router.post("/", protectRoute, createChat);
router.get("/", protectRoute, getUserChats);
router.delete("/:id", protectRoute, deleteChat);

export default router;
