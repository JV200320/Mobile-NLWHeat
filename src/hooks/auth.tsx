import React from "react";
import { IUser } from "../../dtos/User";
import * as AuthSession from 'expo-auth-session'
import { AuthService } from "../services/AuthService";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CLIENT_ID = '79d731c14694d481e5ee';
const SCOPE = 'read:user';

interface AuthContextData {
  user: IUser | null,
  isSigningIn: boolean,
  signIn: () => Promise<void>,
  signOut: () => Promise<void>
}

interface AuthorizationResponse {
  params: {
    code?: string
  }
}

export const AuthContext = React.createContext({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {

  const [isSigningIn, setIsSigningIn] = React.useState<boolean>(true)
  const [user, setUser] = React.useState<IUser | null>(null)

  async function signIn() {
    setIsSigningIn(true)
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`
    try {
      const { params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

      if (params && params.code) {
        const authResponse = await AuthService.logIn(params.code)
        const { user, token } = authResponse

        api.defaults.headers.common.authorization = `Bearer ${token}`

        await AsyncStorage.setItem('@nlwheat:user', JSON.stringify(user))
        await AsyncStorage.setItem('@nlwheat:token', token)

        setUser(user)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsSigningIn(false)
    }
  }

  async function signOut() {
    setUser(null)
    await AsyncStorage.removeItem('@nlwheat:user')
    await AsyncStorage.removeItem('@nlwheat:token')
  }

  async function loadUserStoredData() {
    const userStorage = await AsyncStorage.getItem('@nlwheat:user')
    const tokenStorage = await AsyncStorage.getItem('@nlwheat:token')

    if (userStorage && tokenStorage) {
      api.defaults.headers.common.authorization = `Bearer ${tokenStorage}`
      setUser(JSON.parse(userStorage))
    }
    setIsSigningIn(false)
  }

  React.useEffect(() => {
    loadUserStoredData()
  }, [])

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      isSigningIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}
