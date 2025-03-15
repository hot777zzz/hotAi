interface ChatResponse {
  id: string;
  choices: {
    delta?: {
      content?: string;
    };
    message?: {
      role: string;
      content: string;
    };
  }[];
}

export class ChatService {
  static async *sendMessage(content: string) {
    if (!content) {
      throw new Error("消息不能为空");
    }

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      console.log("发送请求:", content);
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: content }),
        signal,
        // 添加这些选项以确保正确处理流
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `请求失败: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      if (!response.body) {
        throw new Error("无法获取响应流");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      console.log("开始读取响应流...");
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log("响应流读取完成");
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        console.log("收到数据块:", chunk);
        buffer += chunk;

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

          const data = trimmedLine.slice(6);
          if (data === "[DONE]") {
            console.log("收到结束标记");
            return;
          }

          try {
            const parsed = JSON.parse(data) as ChatResponse;
            console.log("解析到响应:", parsed);
            if (parsed.choices[0]?.delta?.content) {
              yield parsed.choices[0].delta.content;
            }
          } catch (error) {
            console.error("解析响应数据失败:", error, "原始数据:", data);
            if (data.includes("error")) {
              try {
                const errorData = JSON.parse(data);
                throw new Error(errorData.error || "未知错误");
              } catch {
                throw new Error("服务器返回了无效的错误信息");
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("发送消息失败:", error);
      throw error instanceof Error ? error : new Error("未知错误");
    } finally {
      controller.abort(); // 清理资源
    }
  }
}
