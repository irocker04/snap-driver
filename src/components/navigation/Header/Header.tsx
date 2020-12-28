import React, {useEffect} from 'react';
import { Text, TouchableNativeFeedback, View, ViewStyle, Animated, Linking} from "react-native"
import styles from "./styles";

import Colors from "@constants/colors";
import {useNavigation} from "@react-navigation/native";
import Icon from "@assets/icons";
import TouchablePlatformSpecific from "@components/common/TouchablePlatformSpecific";
import DriverPhoneIcon from "@assets/icons/DriverPhoneIcon";

interface IProps {
    title: any
    right?: any
    style?: ViewStyle
}

const Header = ({title, style, right}: IProps) => {
    const navigation = useNavigation();

    return (
        <>
            <Animated.View style={[styles.container, style]}>
                <View style={[styles.header]}>
                    <TouchablePlatformSpecific
                        onPress={() => navigation.goBack()}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', true)}
                    >
                        <View style={styles.backButton}>
                            <Icon name="arrowLeft" size={14}/>
                        </View>
                    </TouchablePlatformSpecific>
                    <Text style={styles.title}>{title}</Text>
                    {right && <TouchableNativeFeedback
                        onPress={() => Linking.openURL(`tel:+998555022525`)}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,.1)', true)}
                    >
                        <View style={{position: 'absolute', right: 16}}>
                            <View style={{
                                width: 42,
                                height: 42,
                                backgroundColor: Colors.white,
                                borderRadius: 250,
                                borderWidth: 2,
                                borderColor: '#fff',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <DriverPhoneIcon/>
                            </View>
                        </View>
                    </TouchableNativeFeedback>}
                </View>
            </Animated.View>
        </>
    );
};


export default Header;
