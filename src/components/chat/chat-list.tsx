"use client";

import { Message } from "@/types/chat";
import { useEffect, useRef } from "react";

interface ChatListProps {
  messages: Message[];
}

export function ChatList({ messages }: ChatListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 自动滚动到最新消息
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 space-y-4 p-4 pt-16 md:pt-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[85%] md:max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            }`}
          >
            {message.isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400 [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400 [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 dark:bg-gray-400"></div>
              </div>
            ) : message.isStreaming ? (
              <div className="whitespace-pre-wrap break-words">
                <span className="chat-typewriter">
                  {message.content}
                  <span className="cursor"></span>
                </span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap break-words">
                {message.content}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
