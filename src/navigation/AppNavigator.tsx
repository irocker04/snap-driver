import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import { connect } from 'react-redux';
import AuthenticationStack from './StackNavigators/AuthenticationStack';
import SCREENS from '@constants/screens';
import DrawerStack from './DraweNavigator/DrawerStack';
import AsyncStorage from '@react-native-community/async-storage';
import { Linking } from 'react-native';

const { Navigator, Screen } = createStackNavigator();

interface IProps {
  user: any;
}

const AppNavigator = ({ user }: IProps) => {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem('router');
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
        SplashScreen.hide();
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => {
        AsyncStorage.setItem('router', JSON.stringify(state));
      }}>
      {
        <Navigator
          headerMode={'none'}
          screenOptions={{
            cardStyle: { backgroundColor: '#fff' },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}>
          {!user.isAuthenticated ? (
            <Screen
              name={SCREENS.AUTHENTICATION_STACK}
              component={AuthenticationStack}
            />
          ) : (
            <Screen name={SCREENS.MAIN_STACK} component={DrawerStack} />
          )}
        </Navigator>
      }
    </NavigationContainer>
  );
};

const mapStateToProps = ({ user }: IProps) => ({
  user,
});

export default connect(mapStateToProps)(AppNavigator);
