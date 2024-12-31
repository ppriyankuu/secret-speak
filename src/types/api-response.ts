import { Message } from "@/model/User";

// type definition of API response
export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessages?: boolean;
  messages?: Array<Message>
};
