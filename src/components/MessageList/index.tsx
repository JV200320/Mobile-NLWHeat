import React from 'react';
import { ScrollView, Text } from 'react-native';

import { styles } from './styles';

import { Message } from '../Message';
import { IMessage } from '../../../dtos/Message';
import { MessageService } from '../../services/MessageServices';
import { io } from 'socket.io-client'
import { api } from '../../services/api';

let messagesQueue: IMessage[] = []

const socket = io(String(api.defaults.baseURL))
socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage)
})

export const MessageList: React.FC = () => {

  const [message, setMessages] = React.useState<IMessage[]>([])

  React.useEffect(() => {
    fetchMessages()
  }, [])

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(previousMessages => [messagesQueue[0], previousMessages[0], previousMessages[1]])
        messagesQueue.shift()
      }

    }, 500)

    return () => clearInterval(timer)
  }, [])

  async function fetchMessages() {
    try {
      let messages = await MessageService.getLast3()
      setMessages(messages)
    } catch (error) {
      console.log(error)
    }
  }

  const renderMessages = (): JSX.Element[] | JSX.Element => {
    if (message.length > 0) {
      return message.map((message) => <Message {...message} key={message.id} />)
    }
    return <Text style={styles.noMessages}>Sem mensagens por enquanto</Text>
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps='never'
    >
      {renderMessages()}
    </ScrollView>
  )
}
