interface ChatHistoryProps {
  title: string;
  timestamp: string;
  id: string;
}

interface ChatHistoryComponentProps {
  chatHistory: ChatHistoryProps[];
  onSelectChat: (chatId: string) => void;
  currentChatId: string | null;
}

export function ChatHistory({
  chatHistory,
  onSelectChat,
  currentChatId,
}: ChatHistoryComponentProps) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-xl font-semibold mb-4 text-foreground">历史对话</h2>
      {chatHistory.length === 0 ? (
        <div className="text-center text-muted-foreground py-4">
          暂无历史对话
        </div>
      ) : (
        chatHistory.map((chat) => (
          <div
            key={chat.id}
            className={`flex flex-col gap-1 p-3 rounded-lg cursor-pointer transition-colors ${
              currentChatId === chat.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-accent hover:text-accent-foreground text-foreground"
            }`}
            onClick={() => onSelectChat(chat.id)}
          >
            <span className="text-base font-medium">{chat.title}</span>
            <span className="text-xs text-muted-foreground">
              {chat.timestamp}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
