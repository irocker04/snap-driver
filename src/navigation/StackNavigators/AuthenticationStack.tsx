import React from 'react';
import {
    createStackNavigator,
    CardStyleInterpolators
} from "@react-navigation/stack";

import {
    LanguageSelectScreen,
    LoginScreen,
    EnterCodeScreen
} from "../../screens/Authentication"

import SCREENS from "@constants/screens";
import AuthHeader from "@components/navigation/AuthHeader";

const {Navigator, Screen} = createStackNavigator();

const AuthenticationStack = () => (
    <Navigator
        screenOptions={{
            cardStyle: {backgroundColor: '#fff'},
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        headerMode={"screen"}
    >
        <Screen
            name={SCREENS.LANGUAGE_SELECT}
            component={LanguageSelectScreen}
            options={{
                headerShown: false
            }}
        />
        <Screen
            name={SCREENS.LOGIN}
            component={LoginScreen}
            options={{
                headerShown: false
            }}
        />
        <Screen
            name={SCREENS.ENTER_CODE}
            component={EnterCodeScreen}
            options={{
                headerShown: false
            }}
        />
    </Navigator>
);

export default AuthenticationStack;
