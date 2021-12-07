import React from 'react';
import { View } from 'react-native';
import { COLORS } from '../../themes';

import { AuthContext } from '../../hooks/auth';

import { Button } from '../Button';

import { styles } from './styles';

export const SignInBox: React.FC = () => {

  const { signIn, isSigningIn } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Button
        title="ENTRAR COM GITHUB"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon='github'
        onPress={signIn}
        isLoading={isSigningIn}
      />
    </View>
  )
}