import { Request, Response } from "express";
import { Chat } from "../models/Chat";
import { generateGeminiRoadmap } from "../config/gemini";
import { AuthRequest } from "../middleware/requireAuth";

export const createChat = async (req: AuthRequest, res: Response) => {
  const { prompt, chatId } = req.body;
  if (!prompt) return res.status(400).json({ message: "Prompt is required" });

  try {
    let chat;
    // previous chat
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, userId: req.userId });
      if (!chat) return res.status(404).json({ message: "Chat not found" });
    }
    // new chat
    else {
      chat = new Chat({
        userId: req.userId,
        title: prompt.slice(0, 30), // chat title
        history: [], // chat history
      });
    }
    // use full history
    const aiResponse = await generateGeminiRoadmap(prompt, chat.history);

    // add user prompt and model response to history
    chat.history.push({ role: "user", text: prompt });
    chat.history.push({ role: "model", text: aiResponse });

    await chat.save();
    res.status(201).json({
      _id: chat._id,
      title: chat.title,
      history: chat.history,
      userId: chat.userId,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    console.log("prompt error");
    res.status(500).json({ message: "failed to generate response" });
  }
};
export const getUserChats = async (req: AuthRequest, res: Response) => {
  try {
    const chats = await Chat.find({ userId: req.userId })
      .select("_id title updatedAt")
      .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    console.log("error in getting all chats");
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};
export const getSingleChat = async (req: AuthRequest, res: Response) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.id, userId: req.userId });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch chat" });
  }
};
export const deleteChat = async (req: AuthRequest, res: Response) => {
  try {
    const chat = await Chat.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete chat" });
  }
};
export const deleteAllChats = async (req: AuthRequest, res: Response) => {
  try {
    await Chat.deleteMany({ userId: req.userId });
    res.status(200).json({ message: "All chats deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all chats" });
  }
};
