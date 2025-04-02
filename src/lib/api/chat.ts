import request from "../request";

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

export const sendMessage = (message: string) => {
  return request.post("/chat/use", { message });
};

export const streamMessage = (
  message: string,
  onChunk: (chunk: ChatResponseChunk) => void
) => {
  return new Promise((resolve, reject) => {
    // 从localStorage获取token
    const token = localStorage.getItem("token");

    // 构建URL，添加token作为查询参数
    const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/chat/stream`);
    url.searchParams.append("message", message);
    if (token) {
      url.searchParams.append("token", token);
    }

    const eventSource = new EventSource(url.toString(), {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        resolve(null);
        return;
      }

      try {
        const data = JSON.parse(event.data) as ChatResponseChunk;
        onChunk(data);
      } catch (error) {
        console.error("解析消息流失败", error);
        reject(error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("消息流错误", error);
      eventSource.close();
      reject(error);
    };
  });
};
