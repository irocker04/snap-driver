import {Alert, AppState, StatusBar} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import NetInfo from '@react-native-community/netinfo';
import {StackNavigationProp} from '@react-navigation/stack';
import firebase from "@react-native-firebase/messaging";
import IAction from '@store/types/IAction';
import React, {useEffect, useState, useCallback} from 'react';
import MainScreenView from './view';
import colors from '@constants/colors';
import SCREENS from '@constants/screens';
import BackgroundTimer from 'react-native-background-timer';
import {getDistance} from "geolib";

interface IProps {
    navigation: StackNavigationProp<any>;
    SetDriverStatusOnline: IAction;
    SetDriverStatusOffline: IAction;
    GetOrderInfo: IAction;
    NewOrder: IAction;
    SetNetConnection: IAction;
    driver: any;
    newOrder: any;
    isNetConnected: boolean;
    car: any;
    UpdateLocation: IAction;
    ChangeOrderStatus: IAction;
    Reset: IAction;
    SetTripInfo: IAction;
    GetProfile: IAction;
    SendPush: any;
}


const MainScreenController = (
    {
        navigation,
        driver,
        SetDriverStatusOffline,
        SetDriverStatusOnline,
        NewOrder,
        newOrder,
        SetNetConnection,
        isNetConnected,
        car,
        UpdateLocation,
        GetProfile,
        GetOrderInfo,
        ChangeOrderStatus,
        Reset,
        SendPush,
        SetTripInfo,
    }: IProps) => {
    const [showTariff, setShowTariff] = useState(false);


    const getCurrentOrder = () => {
        if (driver.isBusy) {
            if (newOrder.data.id && newOrder.data.status !== 'new') {
                GetOrderInfo(newOrder.data.id, () => {
                    return {
                        cb: (data: any) => {
                            ChangeOrderStatus(data);
                            navigation.reset({
                                index: 0,
                                routes: [{name: SCREENS.TRIP}]
                            })
                        },
                        socketCb: (data: any) => {
                            ChangeOrderStatus(data)
                        }
                    }
                })
            }
        } else {
            checkStatus();
        }
    }

    const checkStatus = () => {
        if (driver.status) {
            SetDriverStatusOnline(
                {
                    carId: car.id,
                },
                (bookingInfo) => {
                    !driver.isBusy && NewOrder(bookingInfo);
                },
            );
        }
    }



    useEffect(() => {
        // SetDriverStatusOffline()

        getCurrentOrder();
        // const messaging = firebase();
        // messaging.setBackgroundMessageHandler(async (msg) => {
        //     checkStatus()
        // });
        // messaging.onMessage((msg) => {
        //     checkStatus()
        //
        //     const notification: any = msg.data;
        //
        //     if (notification.title === 'message') {
        //         SendPush({
        //             id: notification.data.notification_id,
        //             message: notification.message,
        //         });
        //     }
        //
        //     if (notification.title === 'coming') {
        //         Alert.alert('Клиент', 'Клиент выходить');
        //     }
        // });

        navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor(colors.white);
            GetProfile();
        });

        NetInfo.addEventListener((state) => {
            SetNetConnection(state.isConnected && state.isInternetReachable);
        });


        // return BackgroundTimer.clearInterval(intId);

    }, []);

    const routeTo = (screen: string) => () => {
        navigation.navigate(screen);
    };

    useEffect(() => {
        AppState.addEventListener("change", state => {
            if (state === 'active') {
                getCurrentOrder();
            } else if (state === 'background') {

            }
        });
    }, []);

    const changeDriverStatus = () => {
        if (driver.status) {
            SetDriverStatusOffline();
        } else {
            SetDriverStatusOnline(
                {
                    carId: car.id,
                },
                (bookingInfo) => {
                    !driver.isBusy && NewOrder(bookingInfo);
                },
            );
        }
    };

    return (
        <MainScreenView
            isNetConnected={isNetConnected}
            goToChat={routeTo(SCREENS.NOTIFICATIONS)}
            setShowTariff={setShowTariff}
            showTariff={showTariff}
            driverStatus={driver.status}
            changeDriverStatus={changeDriverStatus}
            isModalVisible={newOrder.isModalVisible}
            rates={car.rates}
        />
    );
};

export default MainScreenController;
