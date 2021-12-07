import React from 'react';
import { View, TextInput, Alert, Keyboard } from 'react-native';
import { MessageService } from '../../services/MessageServices';
import { COLORS } from '../../themes';

import { Button } from '../Button';

import { styles } from './styles'

export const SendMessageForm: React.FC = () => {

  const [message, setMessage] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const handleMessageSubmit = async () => {
    if (message.length == 0) {
      Alert.alert('Escreva a mensagem para enviar.')
      return
    }
    const formattedMessage = message.trim()
    setIsLoading(true)
    try {
      await MessageService.sendMessage(formattedMessage)
    } catch (error) {
      console.log(error)
    }
    setMessage('')
    Keyboard.dismiss()
    setIsLoading(false)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardAppearance='dark'
        placeholder='Qual sua expectativa para o evento?'
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        value={message}
        onChangeText={value => setMessage(value)}
        editable={!isLoading}
      />

      <Button
        title="ENVIAR MENSAGEM"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        onPress={handleMessageSubmit}
        isLoading={isLoading}
        disabled={isLoading}
      />
    </View>
  )
}