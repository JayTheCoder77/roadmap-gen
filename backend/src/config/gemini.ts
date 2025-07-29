import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateGeminiRoadmap = async (prompt: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [
          {
            text: `
                You are an AI assistant that generates **detailed project roadmaps** and step-by-step **checklists** based on a prompt.
                - Do **not** provide code
                - Output should be structured like: "Phase 1: ..., Phase 2: ..." or as a clear list.
                - Be friendly and clear.`.trim(),
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood, I'll generate a roadmap with checklists based on your prompt.",
          },
        ],
      },
    ],
  });

  const result = await chat.sendMessage(prompt);
  return result.response.text();
};
