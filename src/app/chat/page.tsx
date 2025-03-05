"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatList } from "@/components/chat/chat-list";
import { ChatHistory } from "@/components/chat/chat-history";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Message } from "@/types/chat";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true);

      const userMessage: Message = {
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ message: content }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "请求失败");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("发送消息失败:", error);
      // 添加错误消息到对话中
      const errorMessage: Message = {
        role: "assistant",
        content: "抱歉，消息发送失败。请稍后重试。",
      };
      setMessages((prev) => [...prev, errorMessage]);
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
