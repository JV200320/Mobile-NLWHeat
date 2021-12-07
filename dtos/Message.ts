import { IUser } from "./User";

export interface IMessage {
  id: string,
  text: string,
  user: IUser
}