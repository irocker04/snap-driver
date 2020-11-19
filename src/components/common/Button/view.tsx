import React from 'react';
import {View, Text, ActivityIndicator, ViewStyle, TextStyle} from "react-native";


import styles from "./styles";
import TouchablePlatformSpecific from "../TouchablePlatformSpecific";

interface IProps {
    text: string;
    containerStyle?: ViewStyle;
    onPress?: () => void,
    onLongPress?: () => void,
    fontSize?: number;
    isLoading?: boolean;
    disabled?: boolean,
    textStyles?: TextStyle;
}

const Button = (
    {
        textStyles,
        text,
        containerStyle,
        onPress,
        fontSize,
        isLoading = false,
        disabled = false,
        onLongPress
    }: IProps) => {
    return (
        <View style={[styles.button, disabled && styles.disabled, containerStyle]}>
            <TouchablePlatformSpecific
                onPress={onPress}
                onLongPress={onLongPress}
                disabled={isLoading || disabled}
            >
                <View style={styles.wrapper}>
                    {
                        !isLoading
                            ? <Text
                                style={
                                    [
                                        styles.text,
                                        disabled && styles.disabledText,
                                        !fontSize && {fontSize},
                                        textStyles
                                    ]
                                }
                            >
                                {text}
                            </Text>
                            : <ActivityIndicator color={'#fff'} size={"large"}/>
                    }
                </View>
            </TouchablePlatformSpecific>
        </View>
    );
};

export default Button;
