"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatList } from "@/components/chat/chat-list";
import { ChatHistory } from "@/components/chat/chat-history";
import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
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
          <ChatList messages={[]} />
        </main>
        <ChatInput />
      </div>
    </div>
  );
}
