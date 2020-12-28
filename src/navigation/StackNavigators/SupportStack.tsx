import React from 'react';
import PageHeader from "@components/navigation/Header";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import Colors from "@constants/colors";
import SupportScreen from "../../screens/SupportScreen/SupportScreen";
import SupportChatScreen from "../../screens/SupportChatScreen/SupportChatScreen";

const {Navigator, Screen} = createStackNavigator();

const SupportStack = () => (
    <Navigator
        screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
    >
        <Screen
            name="SupportStack"
            component={SupportScreen}
            options={{
                header: (props) => <PageHeader
                    title={"Поддержка"}
                    right={true}
                    {...props}
                />,
                cardStyle: {backgroundColor: Colors.grey}
            }}
        />
        <Screen
            name="SupportChat"
            component={SupportChatScreen}
            options={{
                header: (props) => <PageHeader
                    title={"Служба поддержки"}
                    {...props}
                />,
                cardStyle: {backgroundColor: Colors.grey}
            }}
        />
    </Navigator>
);
export default SupportStack;
