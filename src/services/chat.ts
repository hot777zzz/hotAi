import { sendMessage, streamMessage } from "../lib/api/chat";

// 定义类型接口
interface ChatResponseChunk {
  id: string;
  model: string;
  choices: {
    delta?: {
      content?: string;
      role?: string;
    };
    index: number;
    finish_reason: string | null;
  }[];
}

export class ChatService {
  static async sendMessage(content: string): Promise<string> {
    if (!content) {
      throw new Error("消息不能为空");
    }

    const response = await sendMessage(content);
    console.log(response);

    return response.data.choices[0].message.content;
  }

  static async streamMessage(
    content: string,
    onChunk: (text: string) => void
  ): Promise<string> {
    if (!content) {
      throw new Error("消息不能为空");
    }

    let fullResponse = "";
    let buffer = ""; // 用于积累短文本，实现更自然的打字效果
    let lastChunkTime = Date.now();

    // 随机间隔发送缓冲区的内容，模拟更自然的打字效果
    const sendBuffer = () => {
      if (buffer.length > 0) {
        onChunk(buffer);
        buffer = "";
      }
    };

    try {
      await streamMessage(content, (data: ChatResponseChunk) => {
        // 从流式响应中提取内容
        const chunk = data.choices?.[0]?.delta?.content || "";
        if (chunk) {
          fullResponse += chunk;
          buffer += chunk;

          const now = Date.now();
          // 如果积累了足够的字符或过了足够的时间，发送缓冲区
          if (
            buffer.length >= 3 ||
            now - lastChunkTime > 100 ||
            // 遇到换行符或标点符号时立即发送
            buffer.includes("\n") ||
            /[。，！？：；,.!?:;]$/.test(buffer)
          ) {
            lastChunkTime = now;
            sendBuffer();
          }
        }
      });

      // 发送剩余的缓冲区内容
      sendBuffer();

      return fullResponse;
    } catch (error) {
      console.error("流式消息处理错误:", error);
      throw error;
    }
  }
}
