import React from 'react';
import { View, Text } from 'react-native';
import { MotiView } from 'moti';

import { styles } from './styles'

import { UserPhoto } from '../UserPhoto';
import { IMessage } from '../../../dtos/Message';

export const Message: React.FC<IMessage> = ({ user, text }) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>
        {text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto
          imageUri={user.avatar_url}
          size='SMALL'
        />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
    </MotiView>
  )
}