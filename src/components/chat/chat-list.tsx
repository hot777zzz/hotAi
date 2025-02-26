"use client";

import { Message } from "@/lib/types";
import { ChatMessage } from "./chat-message";

interface ChatListProps {
  messages: Message[];
}

export function ChatList({ messages }: ChatListProps) {
  return (
    <div className="flex flex-col space-y-4 px-4">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          开始你的第一次对话吧
        </div>
      ) : (
        messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))
      )}
    </div>
  );
}
