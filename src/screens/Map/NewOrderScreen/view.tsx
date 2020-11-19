import React from 'react';
import {Text, Image, View, Modal} from 'react-native';
import constStyles from '@constants/constStyles';
import strings from '@constants/strings';
import PulseCountDown from '@components/common/PulseCountDown';
import InfoCard from '@components/cards/InfoCard';
import images from '@assets/images';
import Button from '@components/common/Button';
import styles from './styles';
import IAction from '@store/types/IAction';

interface IProps {
    visible: boolean;
    skipNewOrder: () => void;
    acceptNewOrder: () => void;
    orderDetails: any;
    isLoading: boolean;
}

const NewOrderScreenView = ({
    visible,
    skipNewOrder,
    acceptNewOrder,
    orderDetails,
    isLoading,
}: IProps) => {
    return (
        <Modal visible={visible} transparent>
            <View style={[styles.plane]}>
                <View style={[styles.container, constStyles.shadow]}>
                    <PulseCountDown
                        onPress={skipNewOrder}
                        name={strings.skip}
                        title={strings.order}
                        time={15}
                    />
                    <View style={[styles.section, styles.bottomBorder]}>
                        <View style={styles.left}>
                            <Text style={[styles.price, constStyles.bold]}>
                                {orderDetails.price}
                            </Text>
                            <Text style={[styles.text, constStyles.light]}>
                                Комиссия:{' '}
                                {(orderDetails.commission /
                                    orderDetails.price) *
                                    100}
                                %
                            </Text>
                        </View>
                        <Text style={[styles.distance, constStyles.medium]}>
                            {orderDetails.distance} км
                        </Text>
                    </View>
                    <View style={[styles.rowWrapper, styles.bottomBorder]}>
                        <Image
                            style={styles.location}
                            source={images.location}
                        />
                        <View style={styles.row}>
                            <Text style={[styles.text, constStyles.light]}>
                                {strings.drivingFrom}
                            </Text>
                            <Text
                                style={[styles.locationText, constStyles.bold]}>
                                {orderDetails.id &&
                                    JSON.parse(orderDetails.routes)[0].address}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.tariffWrapper}>
                        <Text style={[styles.tariffTitle, constStyles.light]}>
                            {strings.tariff}:&nbsp;
                        </Text>
                        <Text style={[styles.tariff, constStyles.bold]}>
                            {orderDetails.id && orderDetails.car_type.title}
                        </Text>
                    </View>
                    {orderDetails.comment && (
                        <InfoCard message={orderDetails.comment} />
                    )}
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        fontSize={18}
                        text={strings.accept}
                        onPress={acceptNewOrder}
                        isLoading={isLoading}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default NewOrderScreenView;
