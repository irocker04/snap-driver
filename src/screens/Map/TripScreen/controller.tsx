import React, {useEffect, useState} from 'react';
import {Linking, StatusBar} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import BackgroundTimer from 'react-native-background-timer';
import TripScreenView from "./view";
import OrderStatus from "@constants/orderStatus";
import colors from "@constants/colors";
import IAction from "@store/types/IAction";
import SCREENS from "@constants/screens";

interface IProps {
    navigation: StackNavigationProp<any>;
    newOrder: any;
    destination: any;
    SetWaiting: any;
    SetTripInfo: any;
    tripInfo: any;
    waiting: any;
    ChangeOrderStatus: IAction;
}


const TripScreenController = (
    {
        SetWaiting,
        newOrder,
        destination,
        ChangeOrderStatus,
        navigation,
        SetTripInfo,
        tripInfo,
        waiting
    }: IProps) => {

    const [orderStatus, setOrderStatus] = useState(OrderStatus.ACCEPTED);
    const [waitingTime, setWaitingTime] = useState(waiting.time);
    const [travelTime, setTravelTime] = useState(tripInfo.duration);
    const [intervalId, setIntervalId] = useState(null);
    const [distanceToClient] = useState(destination.distance | 0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor(colors.grey);
    }, []);

    useEffect(() => {
        setOrderStatus(newOrder.data.status);

        if (newOrder.data.status === OrderStatus.PROCESSING) {
            SetWaiting({
                time: waitingTime,
                status: false,
            });
            BackgroundTimer.clearInterval(intervalId);
            return setIntervalId(BackgroundTimer.setInterval(() => {
                setTravelTime(prevState => {
                    SetTripInfo({
                        duration: prevState + 1
                    });
                    return prevState + 1
                });

            }, 1000))
        }

        if (newOrder.data.status === OrderStatus.WAITING) {
            SetWaiting({
                time: waitingTime,
                status: true,
            });
            BackgroundTimer.clearInterval(intervalId);
            return setIntervalId(BackgroundTimer.setInterval(() => {
                setWaitingTime(prevState => {
                    SetWaiting({
                        time: prevState + 1,
                        status: true,
                    });
                    return prevState + 1
                });
            }, 1000))
        }

        if (newOrder.data.status === OrderStatus.DONE) {
            return BackgroundTimer.clearInterval(intervalId);
        }


        if (newOrder.data.status === OrderStatus.ARRIVED) {
            SetWaiting({
                time: 0,
                status: true,
            });
            // @ts-ignore
            setIntervalId(BackgroundTimer.setInterval(() => {
                setWaitingTime(prevState => {
                    SetWaiting({
                        time: prevState + 1,
                        status: true,
                    });
                    return prevState + 1
                });
            }, 1000))
        }

    }, [newOrder.data.status]);


    const onPhonePress = async () => {
        await Linking.openURL(`tel:${newOrder.data.user.phone}`)
    };


    const cancelOrder = () => {
        setIsLoading(true);
        const {driver, id} = newOrder.data;
        ChangeOrderStatus({
            driver_id: driver.user_id,
            orderId: id,
            orderStatus: OrderStatus.CANCELED
        }, () => {
            navigation.reset({
                index: 0,
                routes: [{name: SCREENS.MAIN_STACK}]
            });
            setIsLoading(false);
        }, () => {
            setIsLoading(false)
        })
    };

    return (
        <TripScreenView
            cancelOrder={cancelOrder}
            orderStatus={orderStatus}
            orderInfo={newOrder.data}
            onPhonePress={onPhonePress}
            destination={destination}
            distanceToClient={(distanceToClient / 1000).toFixed(2)}
            isPayedWaiting={waitingTime > 180}
        />

    );
};

export default TripScreenController;
