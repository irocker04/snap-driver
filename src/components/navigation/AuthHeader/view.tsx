import React from 'react';
import { Image, View, Dimensions } from 'react-native';

import styles from './styles';

const AuthHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.posterWrapper}>
        <Image
          style={styles.posterImage}
          source={require('@assets/images/poster.png')}
        />
      </View>
    </View>
  );
};

export default AuthHeader;
