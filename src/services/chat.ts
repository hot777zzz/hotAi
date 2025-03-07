import { Message } from "@/types/chat";
import { HttpService } from "./http";

interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class ChatService {
  static async sendMessage(content: string): Promise<Message> {
    try {
      const data = await HttpService.post<ChatResponse>("/chat", {
        message: content,
      });

      return {
        role: "assistant",
        content: data.choices[0].message.content,
      };
    } catch (error) {
      // 更好的错误处理
      if (error instanceof Error) {
        throw new Error(`发送消息失败: ${error.message}`);
      }
      throw new Error("发送消息失败");
    }
  }
}
