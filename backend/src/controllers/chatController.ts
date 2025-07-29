import { Request, Response } from "express";
import { Chat } from "../models/Chat";
import { generateGeminiRoadmap } from "../config/gemini";
import { AuthRequest } from "../middleware/requireAuth";

export const createChat = async (req: AuthRequest, res: Response) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: "Prompt is required" });

  try {
    const aiResponse = await generateGeminiRoadmap(prompt);
    const chat = await Chat.create({
      userId: req.userId,   
      prompt,
      response: aiResponse,
    });
    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    console.log("prompt error");
    res.status(500).json({ message: "failed to generate response" });
  }
};
export const getUserChats = async () => {};
export const deleteChat = async () => {};
