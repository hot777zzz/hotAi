export interface Message {
  role: "user" | "assistant";
  content: string;
  isLoading?: boolean;
  isStreaming?: boolean;
}
