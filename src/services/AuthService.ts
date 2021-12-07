import { api } from "./api";
import {IUser} from '../../dtos/User'

interface AuthResponse {
  token: string,
  user: IUser
}

export const AuthService = {
  logIn: async (code: string) => {
    let res = await api.post<AuthResponse>('/authenticate', {code: code})
    let userAndToken = res.data
    return userAndToken
  }
}