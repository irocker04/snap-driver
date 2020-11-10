import React from 'react';
import HatCutout from "@components/common/HatCutout";
import colors from "@constants/colors";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import images from "@assets/images";
import Icon from "@assets/icons";
import styles from "./styles";
import Button from "@components/common/Button";
import strings from "@constants/strings";
import PauseIcon from "@assets/icons/PauseIcon";
import MapHeader from "@components/navigation/MapHeader";

interface IProps {
    changeOrderStatus: () => void;
    isLoading: boolean;
    drivingTo: string;
    duration: string;
    distance: number;
    openGoogleMaps: () => void;
    callToClient: () => void;
    wait: () => void;
    isWaiting: boolean;
    isVisible: boolean;
    drivingFrom: string;
    waitingTime: string;
    price: number;
}

const CurrentTripPanelView = (
    {
        changeOrderStatus,
        isLoading,
        drivingTo,
        distance,
        duration,
        openGoogleMaps,
        isWaiting,
        wait,
        isVisible,
        callToClient,
        drivingFrom,
        waitingTime,
        price,
    }: IProps) => {
    return (
        <View style={styles.container}>
            <MapHeader title={'Таксометр'}/>
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', marginTop: 20}}>
                    <Text style={styles.rate}>Эконом</Text>
                    <Text style={styles.price}>{price} сум</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoText}>{distance} km</Text>
                    <Text style={styles.infoText}>{duration}</Text>
                </View>
                <View style={{marginTop: 30, marginLeft: 20}}>
                    <View style={styles.direction}>
                        <View style={styles.row}>
                            <View style={[styles.addressCircle]}>
                                <View style={styles.innerCircle}/>
                            </View>
                            <Text style={styles.directionText}>{drivingFrom}</Text>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.addressCircle, {backgroundColor: 'red'}]}>
                                <View style={styles.innerCircle}/>
                            </View>
                            <Text style={styles.directionText}>{drivingTo}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.waiting}>
                    <Text style={styles.waitingText}>Время ожидание:</Text>
                    <Text style={styles.waitingText}>{waitingTime}</Text>
                </View>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.bottomWrapper}>
                    {
                        isVisible &&
                        <TouchableWithoutFeedback onPress={openGoogleMaps}>
                            <View style={styles.bottomIconWrapper}>
                                <Icon name="path" size={25} color={colors.black}/>
                            </View>
                        </TouchableWithoutFeedback>
                    }
                    <TouchableWithoutFeedback onPress={wait}>
                        <View style={styles.bottomIconWrapper}>
                            <PauseIcon
                                active={isWaiting}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={callToClient}>
                        <View style={styles.bottomIconWrapper}>
                            <Icon name="phone" size={25} color={colors.blue}/>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <Button
                    onLongPress={changeOrderStatus}
                    text={strings.finish as string}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

export default CurrentTripPanelView;
