import React from 'react';
import {View} from 'react-native';

import Map from '../Map';
import {
    CurrentTripPanel,
    DestinationDetailsPanel,
    SelectNavigatorPanel,
    TripEndInfoPanel,
    RatePassengerPanel
} from "./Panels";
import strings from '@constants/strings';
import TripHeader from "@components/navigation/TripHeader";
import OrderStatus from "@constants/orderStatus";
import styles from "./styles";


interface IProps {
    orderStatus: string;
    orderInfo: any;
    onPhonePress: () => void;
    cancelOrder: () => void;
    destination: any;
    distanceToClient: any;
    isPayedWaiting: boolean;
}

const TripScreenView = (
    {
        orderStatus,
        destination,
        distanceToClient,
        isPayedWaiting,
        cancelOrder
    }: IProps) => {

    const renderPanel = () => {
        switch (orderStatus) {
            case OrderStatus.ACCEPTED:
                return <SelectNavigatorPanel/>;
            case OrderStatus.ARRIVED:
                return <DestinationDetailsPanel/>;
            case OrderStatus.PROCESSING:
            case OrderStatus.WAITING:
                return <CurrentTripPanel/>;
            case OrderStatus.DONE:
                return <TripEndInfoPanel/>;
            case OrderStatus.RATING:
                return <RatePassengerPanel/>
        }
    };

    const headerText = () => {
        switch (orderStatus) {
            case OrderStatus.ACCEPTED:
                return {
                    headerTitle: strings.acceptedOrder,
                    title: strings.tillOrder,
                    data: (destination.duration || 1) + ' мин',
                    cancelOrder
                };
            case OrderStatus.ARRIVED:
                return {
                    headerTitle: strings.acceptedOrder,
                    title: strings.waitingTime,
                    styles: {
                        color: isPayedWaiting ? 'red' : 'green'
                    }
                };
            case OrderStatus.DONE:
                return {
                    headerTitle: strings.finishOrder,
                    title: strings.waitingTime,
                };
            case OrderStatus.RATING:
                return {
                    headerTitle: strings.ratePassenger,
                    title: strings.waitingTime,
                };
            default:
                return {}
        }
    };

    return (
        <View style={styles.container}>
            <Map/>
            <View>
                <TripHeader
                    headerTitle={headerText().headerTitle}
                    headerStyles={headerText().styles}
                    orderStatus={orderStatus}
                    topTitle={`${headerText().title}`}
                    topData={`${headerText().data} `}
                    bottomTitle={strings.distance}
                    bottomData={`${distanceToClient} км`}
                    number={'orderInfo && orderInfo.user.phone'}
                    cancelOrder={cancelOrder}
                />
            </View>
            {renderPanel()}
        </View>
    );
};

export default TripScreenView;
