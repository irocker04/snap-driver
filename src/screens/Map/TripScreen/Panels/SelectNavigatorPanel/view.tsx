import React from 'react';
import {Image, Text, View} from "react-native";

import HatCutout from "@components/common/HatCutout";
import colors from "@constants/colors";
import strings from "@constants/strings";
import TouchablePlatformSpecific from "@components/common/TouchablePlatformSpecific";
import Icon from "@assets/icons";
import images from "@assets/images";
import styles from "./styles";
import Button from "@components/common/Button";

interface IProps {
    changeOrderStatus: () => void;
    isLoading: boolean;
    drivingFrom: string;
    openGoogleMaps: () => void;
    callToClient: () => void;
}

const SelectNavigatorPanelView = (
    {
        changeOrderStatus,
        isLoading,
        drivingFrom,
        openGoogleMaps,
        callToClient,
    }: IProps) => {
    return (
        <View>
            <HatCutout style={styles.hatCutOut}/>
            <View style={styles.wrapper}>
                <View style={[styles.innerWrapper, {marginBottom: 20}]}>
                    <Text style={styles.selectNavigatorText}>{strings.selectNavigator}</Text>
                    <View style={styles.iconWrapper}>
                        <TouchablePlatformSpecific onPress={openGoogleMaps}>
                            <View style={styles.icon}>
                                <Icon name="locationFancy" size={20} color={colors.blue}/>
                            </View>
                        </TouchablePlatformSpecific>
                    </View>
                </View>
                <View style={[styles.innerWrapper, {marginBottom: 20}]}>
                    <Text style={styles.selectNavigatorText}>Позвонит клиенту</Text>
                    <View style={styles.iconWrapper}>
                        <TouchablePlatformSpecific onPress={callToClient}>
                            <View style={styles.icon}>
                                <Icon name="phone" size={20} color={colors.blue}/>
                            </View>
                        </TouchablePlatformSpecific>
                    </View>
                </View>
                <View style={styles.locationIconWrapper}>
                    <Image style={styles.locationIcon} source={images.location}/>
                    <View style={styles.textWrapper}>
                        <Text style={styles.drivingFrom}>{strings.drivingFrom}</Text>
                        <Text style={styles.text}>{drivingFrom}</Text>
                    </View>
                </View>
                <Button
                    onPress={changeOrderStatus}
                    text={strings.atPoint as string}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

export default SelectNavigatorPanelView;
