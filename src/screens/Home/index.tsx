import React from 'react'
import { View } from 'react-native'


import { styles } from './styles'

import { Header } from '../../components/Header'
import { MessageList } from '../../components/MessageList'
import { SignInBox } from '../../components/SignInBox'
import { SendMessageForm } from '../../components/SendMessageForm'
import { AuthContext } from '../../hooks/auth'

export const Home: React.FC = () => {

  const { user } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Header />

      <MessageList />

      {user ? <SendMessageForm /> : <SignInBox />}
    </View>
  )
}
