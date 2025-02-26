import { ChatInput } from "@/components/chat/chat-input";
import { ChatList } from "@/components/chat/chat-list";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col">
      <main className="flex-1 overflow-y-auto">
        <ChatList messages={[]} />
      </main>
      <ChatInput />
    </div>
  );
}
