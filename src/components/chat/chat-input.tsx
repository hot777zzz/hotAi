"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整文本框高度
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "80px"; // 重置高度
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 200) + "px"; // 限制最大高度
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput("");
      // 重置文本框高度
      if (textareaRef.current) {
        textareaRef.current.style.height = "80px";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // 按下 Enter 键且没有按住 Shift 键时发送消息
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        onSend(input);
        setInput("");
        // 重置文本框高度
        if (textareaRef.current) {
          textareaRef.current.style.height = "80px";
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2 items-end">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息... (按 Enter 发送，Shift + Enter 换行)"
          className="flex-1 min-h-[80px] max-h-[200px] resize-none"
          disabled={disabled}
        />
        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          className="h-10 w-10 p-2 rounded-full"
        >
          <Send size={18} />
          <span className="sr-only">发送</span>
        </Button>
      </div>
    </form>
  );
}
