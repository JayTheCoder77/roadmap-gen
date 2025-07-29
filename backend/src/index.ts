import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
import cors from "cors";
import { protectRoute } from "./middleware/requireAuth";
import { AuthRequest } from "./middleware/requireAuth";
import chatRoutes from "./routes/chatRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true, // crucial!
  })
);
connectDB();
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/check", protectRoute, (req, res) => {
  const { userId } = req as AuthRequest;
  res.json({ userId });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// ✅ Step 2: POST /api/chat
// Send prompt → call Gemini → store & return

// ✅ Step 3: GET /api/chat
// Return all past chats of that user (sidebar)

// ✅ Step 4 (optional): DELETE /api/chat/:id
// To delete a specific chat

// frontend
