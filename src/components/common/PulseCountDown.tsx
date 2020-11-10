import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PulseLoader from '../lotties/PulseLoader';
import colors from '@constants/colors';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import TouchablePlatformSpecific from './TouchablePlatformSpecific';
// @ts-ignore
import CountDown from 'react-native-countdown-component';
import constStyles from '@constants/constStyles';
import {deviceHeight} from '@constants/values';
import BackgroundTimer from 'react-native-background-timer';

interface PulseCountDownProps {
    time: number;
    title: any;
    name: any;
    onPress: () => void;
}

const PulseCountDown = (
    {
        time,
        title,
        name,
        onPress,
    }: PulseCountDownProps
) => {
    const progressCircle = useRef(null);
    const [sec, setSec] = useState(0);
    useEffect(() => {
        // @ts-ignore
        progressCircle.current.animate('100', time * 1000);
        BackgroundTimer.setTimeout(onPress, time * 1000);
        const intId = BackgroundTimer.setInterval(() => setSec(prevState => prevState + 1), 1000)
        return () => BackgroundTimer.clearInterval(intId);
    }, []);

    return (
        <View style={styles.container}>
            <PulseLoader/>
            <AnimatedCircularProgress
                ref={progressCircle}
                size={deviceHeight * 0.2}
                width={5}
                rotation={0}
                fill={0}
                lineCap="round"
                backgroundWidth={4}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: deviceHeight * 0.2,
                    backgroundColor: colors.grey,
                }}
                tintColor={colors.blue}
                backgroundColor={colors.white}
            >
                {(fill) => (
                    <TouchablePlatformSpecific onPress={onPress}>
                        <View style={styles.countDownWrapper}>
                            <Text numberOfLines={1} style={[styles.title, constStyles.light]}>{title}</Text>
                            <View style={{paddingVertical: 20, paddingBottom: 10}}>
                                <Text style={{
                                    fontSize: 30,
                                    color: colors.blue,
                                    ...constStyles.semibold
                                }}
                                >
                                    {15 - sec}
                                </Text>
                            </View>
                            <Text
                                numberOfLines={1}
                                style={[styles.name, constStyles.medium]}>
                                {name}
                            </Text>
                        </View>
                    </TouchablePlatformSpecific>
                )}
            </AnimatedCircularProgress>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: deviceHeight * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    countDownWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 15,
        marginTop: -5,
    },
    title: {
        fontSize: 14,
        marginBottom: -10,
    },
});

export default PulseCountDown;
