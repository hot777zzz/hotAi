"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatList } from "@/components/chat/chat-list";
import { ChatHistory } from "@/components/chat/chat-history";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Message } from "@/types/chat";
import { ChatService } from "@/services/chat";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);

      // 添加用户消息
      const userMessage: Message = {
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);

      // 添加一个临时的加载消息
      const loadingMessage: Message = {
        role: "assistant",
        content: "思考中...",
        isLoading: true,
      };
      setMessages((prev) => [...prev, loadingMessage]);

      // 发送请求并获取完整响应
      const responseContent = await ChatService.sendMessage(content);

      // 移除加载消息，添加真正的助手消息
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            role: "assistant",
            content: responseContent,
          },
        ];
      });
    } catch (error) {
      console.error("发送消息失败:", error);

      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push("/login");
        return;
      }

      // 移除加载消息，添加错误消息
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            role: "assistant",
            content:
              error instanceof Error
                ? error.message
                : "消息发送失败，请稍后重试",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div
        className={`relative transition-all duration-300 ${
          isSidebarOpen ? "w-72 border-r border-gray-200" : "w-0"
        } h-full bg-gray-50`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onMouseEnter={() => setIsToolTipOpen(true)}
          onMouseLeave={() => setIsToolTipOpen(false)}
          className="absolute right-[-40px] top-4 z-10 rounded-full bg-white p-2 shadow-lg hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>
        {isToolTipOpen && !isSidebarOpen && (
          <div className="absolute right-[-120px] top-16 z-10 rounded-lg bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-gray-600">点击打开历史记录</p>
          </div>
        )}
        <div
          className={`overflow-hidden ${
            isSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <ChatHistory />
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto">
          <ChatList messages={messages} />
        </main>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
