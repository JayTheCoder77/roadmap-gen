import { useEffect, useState } from "react";
import axiosInstance from "../lib/axios";
import Sidebar from "@/components/chat/Sidebar";
import TypingText from "@/components/chat/TypingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";

interface ChatHistoryItem {
  role: "user" | "model";
  text: string;
}

export default function MainLayout() {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // fetch all chats
  const fetchChats = async () => {
    try {
      const res = await axiosInstance.get("/chat/", { withCredentials: true });
      if (Array.isArray(res.data)) {
        setChats(res.data);
      } else if (Array.isArray(res.data?.chats)) {
        setChats(res.data.chats);
      } else {
        setChats([]);
      }
    } catch (err) {
      console.error("Error fetching chats", err);
      setChats([]);
    }
  };

  // fetch single chat
  const fetchChatHistory = async (id: string) => {
    try {
      const res = await axiosInstance.get(`/chat/${id}`, {
        withCredentials: true,
      });
      setHistory(res.data?.history || []);
      setSelectedChatId(id);
    } catch (err) {
      console.error("Error fetching chat history", err);
      setHistory([]);
    }
  };

  // send prompt
  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/chat/",
        { prompt, chatId: selectedChatId },
        { withCredentials: true }
      );

      setHistory(res.data?.history || []);
      setSelectedChatId(res.data?._id || null);
      setPrompt("");
      fetchChats();
    } catch (err) {
      console.error("Error sending prompt", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <>
      <div className="absolute top-4 right-4">
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ModeToggle />
        </ThemeProvider>
      </div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          chats={chats}
          onSelect={fetchChatHistory}
          onRefresh={fetchChats}
          selectedChatId={selectedChatId || ""}
        />

        {/* Chat Area */}
        <div className="flex flex-col flex-1">
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {history.length === 0 ? (
              <div className="text-center text-muted-foreground mt-10">
                Select a chat or start a new one
              </div>
            ) : (
              history.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-md max-w-[80%] ${
                    msg.role === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.role === "model" &&
                  i === history.length - 1 &&
                  loading ? (
                    <TypingText text={msg.text} speed={20} />
                  ) : (
                    msg.text
                  )}
                </div>
              ))
            )}
          </div>

          {/* Prompt Box */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && sendPrompt()}
            />
            <Button onClick={sendPrompt} disabled={loading}>
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
