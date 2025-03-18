import { sendMessage } from "../lib/api/chat";

export class ChatService {
  static async sendMessage(content: string): Promise<string> {
    if (!content) {
      throw new Error("消息不能为空");
    }

    const response = await sendMessage(content);
    console.log(response);

    return response.data.choices[0].message.content;
  }
}
