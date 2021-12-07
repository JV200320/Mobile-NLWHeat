import React from 'react';
import {
  TouchableOpacity, TouchableOpacityProps, Text,
  ColorValue, ActivityIndicator
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'

import { styles } from './styles'

interface Props extends TouchableOpacityProps {
  color: ColorValue,
  title: string,
  backgroundColor: ColorValue,
  icon?: React.ComponentProps<typeof AntDesign>['name'],
  isLoading?: boolean
}

export const Button: React.FC<Props> = ({ isLoading = false, title, color,
  backgroundColor, icon, ...rest }) => {

  const renderButtonSituation = (): JSX.Element => {
    if (isLoading) {
      return <ActivityIndicator color={color} />
    }
    return (
      <>
        <AntDesign
          name={icon}
          size={24}
          style={styles.icon}
        />
        <Text style={[
          styles.title,
          { color }
        ]}>
          {title}
        </Text>
      </>
    )
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor },
      ]}
      activeOpacity={0.7}
      disabled={isLoading}
      {...rest}
    >
      {renderButtonSituation()}
    </TouchableOpacity>
  )
}