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

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    try {
      setIsLoading(true);

      // 添加用户消息
      const userMessage: Message = {
        role: "user",
        content,
      };
      setMessages((prev) => [...prev, userMessage]);

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
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            role: "assistant",
            content: responseContent,
          },
        ];
      });
    } catch (error) {
      console.error("发送消息失败:", error);

      if (error instanceof AxiosError && error.response?.status === 401) {
        router.push("/login");
        return;
      }

      // 移除加载消息，添加错误消息
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.isLoading);
        return [
          ...filtered,
          {
            role: "assistant",
            content:
              error instanceof Error
                ? error.message
                : "消息发送失败，请稍后重试",
          },
        ];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 移动端侧边栏遮罩 */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
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
        } h-full bg-gray-50 border-r border-gray-200`}
      >
        {/* 移动端关闭按钮 */}
        {isMobile && isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-2 top-2 p-2 rounded-full hover:bg-gray-200"
          >
            <X size={20} />
          </button>
        )}

        {/* 桌面端切换按钮 */}
        {!isMobile && (
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
        )}

        {isToolTipOpen && !isSidebarOpen && !isMobile && (
          <div className="absolute right-[-120px] top-16 z-10 rounded-lg bg-white px-3 py-2 shadow-lg">
            <p className="text-sm text-gray-600">点击打开历史记录</p>
          </div>
        )}

        <div
          className={`h-full overflow-y-auto ${
            isMobile || isSidebarOpen ? "opacity-100 w-72" : "opacity-0 w-0"
          }`}
        >
          <ChatHistory />
        </div>
      </div>

      <div className="flex flex-col flex-1 relative">
        {/* 移动端菜单按钮 */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute left-4 top-4 z-10 p-2 rounded-full bg-white shadow-md hover:bg-gray-100"
          >
            <Menu size={20} />
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
