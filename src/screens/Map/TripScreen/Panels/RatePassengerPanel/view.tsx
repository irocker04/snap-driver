import React from 'react';
import {Text, TextInput, TouchableWithoutFeedback, View} from "react-native";

import HatCutout from "@components/common/HatCutout";
import strings from "@constants/strings";
import styles from "./styles";
import Button from "@components/common/Button";
import StarIcon from "@assets/icons/StarIcon";

interface IProps {
    review: string;
    setReview: (review: string) => void;
    rateOrder: () => void;
    rate: number;
    setRate: (rate: number) => void;
    isLoading: boolean;
}

const RatePassengerPanelView = (
    {
        rate,
        rateOrder,
        review,
        setRate,
        setReview,
        isLoading
    }: IProps) => {
    const Rate = () => (
        <View style={styles.startContainer}>
            {
                [...new Array(5)].map((item, index) => (
                    <TouchableWithoutFeedback onPress={() => setRate(index + 1)}>
                        <StarIcon
                            active={index < rate}
                            style={{marginRight: 10}}
                            width={35.26}
                            height={33.79}
                        />
                    </TouchableWithoutFeedback>
                ))
            }
        </View>
    );
    return (
        <View>
            <HatCutout style={styles.hatCutOut}/>
            <View style={styles.wrapper}>
                <View style={styles.topTextWrapper}>
                    <Text style={styles.howWasTrip}>{strings.howWasTrip}</Text>
                    <Text style={styles.rateTrip}>{strings.rateTrip}</Text>
                </View>
                {Rate()}
                <View style={styles.textarea}>
                    <TextInput
                        value={review}
                        onChangeText={text => setReview(text)}
                        multiline={true}
                        placeholder={strings.leaveFeedBack}
                    />
                </View>
                <Button
                    onLongPress={rateOrder}
                    text={strings.finish as string}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );
};

export default RatePassengerPanelView;
