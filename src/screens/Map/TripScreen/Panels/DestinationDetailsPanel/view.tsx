import React from 'react';
import {Image, Text, View, Animated, TouchableWithoutFeedback} from "react-native";
import HatCutout from "@components/common/HatCutout";
import colors from "@constants/colors";
import images from "@assets/images";
import strings from "@constants/strings";
import Icon from "@assets/icons";
import styles from "./styles";
import Button from "@components/common/Button";

interface IProps {
    changeOrderStatus: () => void;
    isLoading: boolean;
    drivingFrom: string;
    drivingTo: string;
    panResPonder: any;
    collapse: any;
    onPhonePress: () => void;
    goToChat: () => void;
}

const DestinationDetailsPanelView = (
    {
        changeOrderStatus,
        isLoading,
        drivingFrom,
        drivingTo,
        panResPonder,
        collapse,
        onPhonePress,
        goToChat
    }: IProps) => {
    return (
        <View>
            <HatCutout style={styles.hatCutOut}/>
            <View style={styles.wrapper}>
                <View {...panResPonder.panHandlers}>
                    <View>
                        <View style={styles.dragIcon}/>
                        <View style={styles.innerWrapper}>
                            <View style={{paddingTop: 5}}>
                                <Image source={images.locationBorder} style={styles.img}/>
                            </View>
                            <View>
                                <View style={styles.drivingFromWrapper}>
                                    <Text style={styles.drivingText}>{strings.drivingFrom}</Text>
                                    <Text style={styles.text}>{drivingFrom}</Text>
                                </View>
                                <View style={styles.drivingToWrapper}>
                                    <Text style={styles.drivingText}>{strings.drivingTo}</Text>
                                    <Text style={styles.text}>{drivingTo}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Animated.View style={{height: collapse, overflow: 'hidden'}}>
                    <View style={styles.optionsWrapper}>
                        <View style={styles.optionWrapper}>
                            <Icon name="airCondition" color={colors.blue} size={25}/>
                            <Text style={[styles.optionText]}>{strings.airConditioner}</Text>
                            <Icon name="checkCircle" color={colors.blue} size={25}/>
                        </View>
                    </View>
                    <View style={styles.bottomWrapper}>
                        <TouchableWithoutFeedback onPress={goToChat}>
                            <View style={styles.bottomIconWrapper}>
                                <Icon name="chat" size={25} color={colors.blue}/>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={onPhonePress}>
                            <View style={styles.bottomIconWrapper}>
                                <Icon name="phone" size={25} color={colors.blue}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </Animated.View>
                <Button
                    onLongPress={changeOrderStatus}
                    text={strings.letsGo as string}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

export default DestinationDetailsPanelView;
