"use client";

import { ChatInput } from "@/components/chat/chat-input";
import { ChatList } from "@/components/chat/chat-list";
import { ChatHistory } from "@/components/chat/chat-history";
import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import { Message } from "@/types/chat";
import { ChatService } from "@/services/chat";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

// 定义聊天历史记录的类型
interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const router = useRouter();

  // 检测设备类型
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // 从本地存储加载聊天历史
  useEffect(() => {
    const storedHistory = localStorage.getItem("chatHistory");
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory));
    }
  }, []);

  // 添加开场白并创建新聊天
  useEffect(() => {
    if (messages.length === 0 && !currentChatId) {
      const welcomeMessage: Message = {
        role: "assistant",
        content: "你好,这是由Hot7开发的开源ai调用项目,请开始和我对话吧",
      };
      setMessages([welcomeMessage]);

      // 创建新的聊天记录
      createNewChat([welcomeMessage]);
    }
  }, []);

  // 创建新的聊天记录
  const createNewChat = (initialMessages: Message[] = []) => {
    const newChatId = Date.now().toString();
    const newChat: ChatHistoryItem = {
      id: newChatId,
      title:
        initialMessages.length > 0 ? getTitle(initialMessages[0]) : "新对话",
      timestamp: new Date().toLocaleString(),
      messages: initialMessages,
    };

    const updatedHistory = [newChat, ...chatHistory];
    setChatHistory(updatedHistory);
    setCurrentChatId(newChatId);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
  };

  // 从消息中提取标题
  const getTitle = (message: Message) => {
    if (message.content.length > 20) {
      return message.content.substring(0, 20) + "...";
    }
    return message.content;
  };

  // 更新聊天历史
  const updateChatHistory = (updatedMessages: Message[]) => {
    if (!currentChatId) return;

    const updatedHistory = chatHistory.map((chat) => {
      if (chat.id === currentChatId) {
        // 使用第一条用户消息作为标题
        const userMessage = updatedMessages.find((msg) => msg.role === "user");
        const title = userMessage ? getTitle(userMessage) : "新对话";

        return {
          ...chat,
          title,
          timestamp: new Date().toLocaleString(),
          messages: updatedMessages,
        };
      }
      return chat;
    });

    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
  };

  // 加载指定的聊天记录
  const loadChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);

      // 如果是移动设备，加载聊天后关闭侧边栏
      if (isMobile) {
        setIsSidebarOpen(false);
      }
    }
  };

  // 开始新的聊天
  const startNewChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "你好，这是由Hot7开发的开源ai调用项目，请开始和我对话吧",
      },
    ]);
    createNewChat([
      {
        role: "assistant",
        content: "你好，这是由Hot7开发的开源ai调用项目，请开始和我对话吧",
      },
    ]);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);

      // 添加用户消息
      const userMessage: Message = {
        role: "user",
        content,
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);

      // 更新聊天历史
      updateChatHistory(updatedMessages);

      // 添加一个临时的加载消息
      const loadingMessage: Message = {
        role: "assistant",
        content: "思考中...",
        isLoading: true,
      };
      setMessages((prev) => [...prev, loadingMessage]);

      // 如果是移动设备，发送消息时自动关闭侧边栏
      if (isMobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }

      // 发送请求并获取完整响应
      const responseContent = await ChatService.sendMessage(content);

      // 移除加载消息，添加真正的助手消息
      const finalMessages = updatedMessages.concat([
        {
          role: "assistant",
          content: responseContent,
        },
      ]);

      setMessages(finalMessages);

      // 更新聊天历史
      updateChatHistory(finalMessages);
    } catch (error) {
      console.error("发送消息失败:", error);

      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push("/login");
        return;
      }

      // 移除加载消息，添加错误消息
      const errorMessages = messages
        .filter((msg) => !msg.isLoading)
        .concat([
          {
            role: "assistant",
            content:
              error instanceof Error
                ? error.message
                : "消息发送失败，请稍后重试",
          },
        ]);

      setMessages(errorMessages);

      // 更新聊天历史
      updateChatHistory(errorMessages);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 移动端侧边栏遮罩 */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 侧边栏 */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-30 transition-transform duration-300 ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : `relative transition-all duration-300 ${
                isSidebarOpen ? "w-72" : "w-0"
              }`
        } h-full bg-background border-r border-border`}
      >
        {/* 移动端关闭按钮 */}
        {isMobile && isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-2 top-2 p-2 rounded-full hover:bg-accent"
          >
            <X size={20} className="text-foreground" />
          </button>
        )}

        {/* 桌面端切换按钮 */}
        {!isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            onMouseEnter={() => setIsToolTipOpen(true)}
            onMouseLeave={() => setIsToolTipOpen(false)}
            className="absolute right-[-40px] top-4 z-10 rounded-full bg-background p-2 shadow-md hover:bg-accent transition-colors"
          >
            {isSidebarOpen ? (
              <ChevronLeft size={20} className="text-foreground" />
            ) : (
              <ChevronRight size={20} className="text-foreground" />
            )}
          </button>
        )}

        {isToolTipOpen && !isSidebarOpen && !isMobile && (
          <div className="absolute right-[-120px] top-16 z-10 rounded-lg bg-background px-3 py-2 shadow-md">
            <p className="text-sm text-muted-foreground">点击打开历史记录</p>
          </div>
        )}

        <div
          className={`h-full overflow-y-auto ${
            isMobile || isSidebarOpen ? "opacity-100 w-72" : "opacity-0 w-0"
          }`}
        >
          <div className="p-4">
            <button
              onClick={startNewChat}
              className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors mb-4"
            >
              新对话
            </button>
          </div>
          <ChatHistory
            chatHistory={chatHistory}
            onSelectChat={loadChat}
            currentChatId={currentChatId}
          />
        </div>
      </div>

      <div className="flex flex-col flex-1 relative">
        {/* 移动端菜单按钮 */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-4 top-4 z-10 p-2 rounded-full bg-background shadow-md hover:bg-accent"
          >
            <Menu size={20} className="text-foreground" />
          </button>
        )}

        <main className="flex-1 overflow-y-auto">
          <ChatList messages={messages} />
        </main>
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}
