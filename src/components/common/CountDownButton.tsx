import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationScreenProp, withNavigation} from 'react-navigation';
import CountDown from 'react-native-countdown-component';
import colors from '../../constants/colors';
import constStyles from '../../constants/constStyles';
import Touchable from './Touchable';

interface CountDownButtonProps {
    navigation?: NavigationScreenProp<{}>;
    backColor: string;
    countDownBackColor: string;
    time: number;
    text: string;
    textColor: string;
    style: Object;
    onPress: any;
    setShowDetails: any;
    setShowNotification: any;
}

const CountDownButton = ({
    navigation,
    backColor,
    countDownBackColor,
    time,
    text,
    textColor,
    style,
    onPress,
    setShowDetails,
    setShowNotification,
}: CountDownButtonProps) => {
    return (
        <View style={[style, styles.plane]}>
            <Touchable onPress={onPress}>
                <View
                    style={[
                        styles.container,
                        constStyles.shadow,
                        !!backColor && {
                            backgroundColor: backColor,
                        },
                    ]}>
                    <Text
                        style={[
                            styles.text,
                            constStyles.medium,
                            !!textColor && {color: textColor},
                        ]}>
                        {text}
                    </Text>
                    <View
                        style={[
                            styles.countDownWraper,
                            !!countDownBackColor && {
                                backgroundColor: countDownBackColor,
                            },
                        ]}>
                        <CountDown
                            until={50}
                            size={22}
                            onFinish={() => {
                                setShowDetails(false);
                                setShowNotification(false);
                            }}
                            digitStyle={{
                                backgroundColor: colors.transparent,
                                width: 30,
                                height: 10,
                            }}
                            digitTxtStyle={{color: textColor}}
                            timeToShow={['S']}
                            timeLabels={{s: null}}
                        />
                    </View>
                </View>
            </Touchable>
        </View>
    );
};

const styles = StyleSheet.create({
    plane: {
        borderRadius: 30,
        overflow: 'hidden',
    },
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        paddingLeft: 30,
    },
    countDownWraper: {
        padding: 20,
        paddingHorizontal: 8,
        borderRadius: 40,
    },
});

export default withNavigation(CountDownButton);
