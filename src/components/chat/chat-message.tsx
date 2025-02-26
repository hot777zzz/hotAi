"use client";

import { Message } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex w-full items-start gap-4 rounded-lg p-4",
        message.role === "assistant"
          ? "bg-muted text-muted-foreground"
          : "bg-primary/10 text-foreground"
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="prose break-words">{message.content}</div>
      </div>
    </div>
  );
}
