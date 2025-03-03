interface ChatHistoryProps {
  title: string;
  timestamp: string;
}

export function ChatHistory() {
  const messages: ChatHistoryProps[] = [
    { title: "你好", timestamp: "2024-01-01 12:00:00" },
    { title: "你好", timestamp: "2024-01-01 12:00:00" },
  ];
  return (
    <div className="flex flex-col gap-3 p-4">
      <h2 className="text-xl font-semibold mb-4">历史对话</h2>
      {messages.map((message, index) => (
        <div
          key={index}
          className="flex flex-col gap-1 p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
        >
          <span className="text-base font-medium text-gray-800">
            {message.title}
          </span>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
}
