import { IMessage } from "../../dtos/Message";
import { api } from "./api";

export const MessageService = {
  getLast3: async () => {
    let res = await api.get<IMessage[]>("/messages/last3")
    let messages = res.data
    return messages
  },
  sendMessage: async (message: string) => {
    await api.post('/messages', {message})
  }
}