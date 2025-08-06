import { Router } from "express";
import { register, login, logout } from "../controllers/authController";
import { getMe } from "../controllers/authController";
import { protectRoute } from "../middleware/requireAuth";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protectRoute, getMe);
export default router;
