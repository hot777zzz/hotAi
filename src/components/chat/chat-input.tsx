"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useChat } from "@/lib/hooks/use-chat";

export function ChatInput() {
  const { input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-4 p-4 bg-background border-t"
    >
      <Textarea
        value={input}
        onChange={handleInputChange}
        placeholder="输入消息..."
        className="min-h-[80px] w-full resize-none"
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="w-24 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        发送
      </Button>
    </form>
  );
}
