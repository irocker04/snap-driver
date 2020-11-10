import {Alert, StatusBar} from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import NetInfo from '@react-native-community/netinfo';
import {StackNavigationProp} from '@react-navigation/stack';
import firebase from "@react-native-firebase/messaging";
import LaunchApplication from 'react-native-launch-application';
import IAction from '@store/types/IAction';
import React, {useEffect, useState} from 'react';
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
    const [location, setLocation] = useState({latitude: 1, longitude: 2});
    const [history, setHistory] = useState<any>([]);
    const [distance, setDistance] = useState<number>(0);

    let configureBackgroundGeolocation = () => {

        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 50,
            distanceFilter: 50,
            notificationTitle: 'Background tracking',
            notificationText: 'enabled',
            debug: false,
            startOnBoot: false,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
            interval: 10000,
            fastestInterval: 5000,
            activitiesInterval: 10000,
            stopOnStillActivity: false,
        });

        BackgroundGeolocation.on('location', (location) => {

            SetTripInfo({
                routeCoordinates: history,
                distance,
            });

            setLocation((prev) => ({
                ...prev,
                latitude: location.latitude,
                longitude: location.longitude,
            }));

            setHistory((prev) => {
                setDistance((prevDistance) => {
                    if (prev.length === 0) {
                        return 0;
                    }
                    const latestItem = prev[prev.length - 1];
                    return (
                        prevDistance +
                        getDistance(
                            {
                                latitude: latestItem.latitude,
                                longitude: latestItem.longitude,
                            },
                            {
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }
                        )
                    );
                });

                return prev.concat({
                    latitude: location.latitude,
                    longitude: location.longitude,
                });
            });

            BackgroundGeolocation.startTask((taskKey) => {

                BackgroundGeolocation.endTask(taskKey);
            });
        });

        BackgroundGeolocation.on('stationary', (stationaryLocation) => {

        });

        BackgroundGeolocation.on('error', (error) => {
            console.log('[ERROR] BackgroundGeolocation error:', error);
        });

        BackgroundGeolocation.on('start', () => {
            console.log(
                '[INFO] BackgroundGeolocation service has been started',
            );
        });

        BackgroundGeolocation.on('stop', () => {
            console.log(
                '[INFO] BackgroundGeolocation service has been stopped',
            );
        });

        BackgroundGeolocation.on('authorization', (status) => {
            console.log(
                '[INFO] BackgroundGeolocation authorization status: ' + status,
            );
            if (status !== BackgroundGeolocation.AUTHORIZED) {
                // we need to set delay or otherwise alert may not be shown
                setTimeout(
                    () =>
                        Alert.alert(
                            'App requires location tracking permission',
                            'Would you like to open app settings?',
                            [
                                {
                                    text: 'Yes',
                                    onPress: () =>
                                        BackgroundGeolocation.showAppSettings(),
                                },
                                {
                                    text: 'No',
                                    onPress: () => console.log('No Pressed'),
                                    style: 'cancel',
                                },
                            ],
                        ),
                    1000,
                );
            }
        });

        BackgroundGeolocation.on('background', () => {
            console.log('[INFO] App is in background');
        });

        BackgroundGeolocation.on('foreground', () => {
            console.log('[INFO] App is in foreground');
        });

        BackgroundGeolocation.on('abort_requested', () => {
            console.log(
                '[INFO] Server responded with 285 Updates Not Required',
            );

            // Here we can decide whether we want stop the updates or not.
            // If you've configured the server to return 285, then it means the server does not require further update.
            // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
            // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
        });

        BackgroundGeolocation.on('http_authorization', () => {
            console.log('[INFO] App needs to authorize the http requests');
        });

        BackgroundGeolocation.checkStatus((status) => {
            console.log(
                '[INFO] BackgroundGeolocation service is running',
                status.isRunning,
            );
            console.log(
                '[INFO] BackgroundGeolocation services enabled',
                status.locationServicesEnabled,
            );
            console.log(
                '[INFO] BackgroundGeolocation auth status: ' +
                status.authorization,
            );

            // you don't need to check status before start (this is just the example)
            if (!status.isRunning) {
                BackgroundGeolocation.start(); //triggers start on start event
            }
        });

        // you can also just start without checking for status
        // BackgroundGeolocation.start();
    };

    useEffect(() => {

        // const intId = BackgroundTimer.setInterval(() => {
        //     UpdateLocation({
        //         lat: `${111}`,
        //         lng: `${222}`,
        //     });
        //
        // }, 10000);

        const messaging = firebase();
        messaging.setBackgroundMessageHandler(async (msg) => {
            LaunchApplication.open('com.snapdriver');
            if (driver.status && !driver.isBusy) {
                SetDriverStatusOnline(
                    {
                        carId: car.id,
                    },
                    (bookingInfo) => {
                        !driver.isBusy && NewOrder(bookingInfo);
                    },
                );
            }
        });
        messaging.onMessage((msg) => {
            if (driver.status && !driver.isBusy) {
                SetDriverStatusOnline(
                    {
                        carId: car.id,
                    },
                    (bookingInfo) => {
                        !driver.isBusy && NewOrder(bookingInfo);
                    },
                );
            }

            const notification: any = msg.data;

            if (notification.title === 'message') {
                SendPush({
                    id: notification.data.notification_id,
                    message: notification.message,
                });
            }

            if (notification.title === 'coming') {
                Alert.alert('Клиент', 'Клиент выходить');
            }
        });

        navigation.addListener('focus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor(colors.white);
            GetProfile();
        });

        NetInfo.addEventListener((state) => {
            SetNetConnection(state.isConnected && state.isInternetReachable);
        });

        configureBackgroundGeolocation();

        if (newOrder.data.id && newOrder.data.status !== 'new') {
            GetOrderInfo(newOrder.data.id, () => {
                return {
                    cb: (data) => {
                        ChangeOrderStatus(data);
                        navigation.reset({
                            index: 0,
                            routes: [{name: SCREENS.TRIP}]
                        })
                    },
                    socketCb: (data) => {
                        ChangeOrderStatus(data)
                    }
                }
            })
        } else {
            Reset()
        }

        // return BackgroundTimer.clearInterval(intId);

    }, []);

    const routeTo = (screen: string) => () => {
        navigation.navigate(screen);
    };

    // useEffect(() => {
    //     AppState.addEventListener("change", state => {
    //         if (state === 'active') {
    //             if (order.id && order.status !== 'new') {
    //                 GetOrderInfo(order.id, () => {
    //                     return {
    //                         cb: (data) => {
    //                             ChangeOrderStatus(data);
    //                             navigation.reset({
    //                                 index: 0,
    //                                 routes: [{name: 'Trip'}]
    //                             })
    //                         },
    //                         socketCb: (data) => {
    //                             ChangeOrderStatus(data)
    //                         }
    //                     }
    //                 })
    //             }
    //         } else if (state === 'background') {
    //
    //         }
    //     });
    // }, []);

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
