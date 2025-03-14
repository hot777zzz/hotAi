interface ChatResponse {
  choices: Array<{
    delta?: {
      content?: string;
    };
    message?: {
      content: string;
    };
  }>;
}

export class ChatService {
  static async *sendMessage(content: string) {
    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          Connection: "keep-alive",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "User-Agent": "HotAI/1.0.0",
        },
        body: JSON.stringify({ message: content }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Response body is null");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;

          const data = trimmedLine.slice(6);
          if (data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data) as ChatResponse;
            if (parsed.choices[0].delta?.content) {
              yield parsed.choices[0].delta.content;
            }
          } catch {
            if (data.includes("error")) {
              throw new Error(JSON.parse(data).error);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`发送消息失败: ${error.message}`);
      }
      throw new Error("发送消息失败");
    }
  }
}
