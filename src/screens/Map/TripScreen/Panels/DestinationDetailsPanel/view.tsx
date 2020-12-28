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
    isUnread: number;
    drivingFrom: string;
    drivingTo: string;
    panResPonder: any;
    collapse: any;
    airCondition: boolean;
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
        goToChat,
        isUnread,
        airCondition,
    }: IProps) => {

    return (
        <View>
            <HatCutout style={styles.hatCutOut}/>
            <View style={styles.wrapper}>
                <View {...panResPonder.panHandlers}>
                    <View style={styles.dragIcon}/>
                    <View style={styles.innerWrapper}>
                        <View style={styles.direction}>
                            <View style={styles.row}>
                                <View style={[styles.addressCircle]}/>
                                <Text style={styles.directionText}>{drivingFrom}</Text>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.addressCircle, {backgroundColor: 'red'}]}/>
                                <Text style={styles.directionText}>{drivingTo}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Animated.View style={{height: collapse, overflow: 'hidden'}}>
                    <View style={styles.optionsWrapper}>
                        <View style={styles.optionWrapper}>
                            <Icon name="airCondition" color={colors.black} size={25}/>
                            <Text style={[styles.optionText]}>{strings.airConditioner}</Text>
                            {airCondition && <Icon name="checkCircle" color={colors.blue} size={25}/>}
                        </View>
                    </View>
                    <View style={styles.bottomWrapper}>
                        <TouchableWithoutFeedback onPress={goToChat}>
                            <View style={styles.bottomIconWrapper}>
                                {
                                    isUnread > 0 &&
                                    <View style={styles.dot}>
                                        <Text style={styles.dotText}>{isUnread}</Text>
                                    </View>
                                }
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
