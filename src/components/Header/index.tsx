import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import LogoSvg from '../../assets/logo.svg';
import { AuthContext } from '../../hooks/auth';
import { UserPhoto } from '../UserPhoto';

import { styles } from './styles';

export const Header: React.FC = () => {

  const { user, signOut } = React.useContext(AuthContext)

  return (
    <View style={styles.container}>

      <LogoSvg />

      <View style={styles.logoutButton}>
        {user &&
          <TouchableOpacity
            onPress={signOut}
          >
            <Text style={styles.logoutText}>
              Sair
            </Text>
          </TouchableOpacity>}

        <UserPhoto
          imageUri={user?.avatar_url}
        />
      </View>


    </View>
  )
}
