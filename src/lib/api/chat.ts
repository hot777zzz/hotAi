import request from "../request";

export const sendMessage = (message: string) => {
  return request.post("/chat/use", { message });
};
