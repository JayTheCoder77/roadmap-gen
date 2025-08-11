import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, MessageSquare } from "lucide-react";
import axiosInstance from "../../lib/axios";

export default function Sidebar({
  chats,
  onSelect,
  onRefresh,
  selectedChatId,
}: any) {
  const deleteChat = async (id: string) => {
    await axiosInstance.delete(`/chat/${id}`, { withCredentials: true });
    onRefresh();
  };

  const deleteAll = async () => {
    await axiosInstance.delete(`/chat/`, { withCredentials: true });
    onRefresh();
  };

  return (
    <div className="w-64 border-r flex flex-col">
      <div className="p-4 flex justify-between border-b">
        <h2 className="font-bold">Chats</h2>
        <Button variant="destructive" size="icon" onClick={deleteAll}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        {chats.map((chat: any) => (
          <div
            key={chat._id}
            onClick={() => onSelect(chat._id)}
            className={`flex justify-between px-4 py-2 cursor-pointer ${
              selectedChatId === chat._id ? "bg-accent" : "hover:bg-muted"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <MessageSquare className="w-4 h-4" />
              <span className="truncate">{chat.title}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat._id);
              }}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}
