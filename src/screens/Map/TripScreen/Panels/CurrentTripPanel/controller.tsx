import React, {useState, useEffect} from 'react';
import CurrentTripPanelView from "./view";
import IAction from "@store/types/IAction";
import OrderStatus from "@constants/orderStatus";
import {Alert, Linking, Platform} from "react-native";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import {getDistance} from "geolib";

interface IProps {
    ChangeOrderStatus: IAction;
    SetTripInfo: IAction;
    newOrder: any;
    destination: any;
    waiting: any;
    tripInfo: any;
}

const CurrentTripPanelController = ({ChangeOrderStatus, waiting, newOrder, destination, SetTripInfo, tripInfo}: IProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [slocation, setLocation] = useState(tripInfo.routeCoordinates.reverse(0));
    const [history, setHistory] = useState<any>(tripInfo.routeCoordinates);
    const [distance, setDistance] = useState<number>(tripInfo.distance);

    useEffect(() => {
        configureBackgroundGeolocation();
    }, [])

    const openGoogleMaps = () => {
        const {routes} = newOrder.data;
        const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
        const latLng = `${routes[1].lat},${routes[1].lng}`;
        const url = Platform.select({
            ios: `${scheme}@${latLng}`,
            android: `${scheme}${latLng}`
        });

        Linking.openURL(url as string).then();
    };

    const wait = () => {
        const {data} = newOrder;
        ChangeOrderStatus({
            driver_id: data.driver.user_id,
            orderId: data.id,
            orderStatus: newOrder.data.status === OrderStatus.WAITING ? OrderStatus.PROCESSING : OrderStatus.WAITING
        }, () => {
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        });
    };

    const changeOrderStatus = () => {
        BackgroundGeolocation.stop();
        setIsLoading(true);
        const {data} = newOrder;
        ChangeOrderStatus({
            driver_id: data.driver.user_id,
            orderId: data.id,
            orderStatus: OrderStatus.DONE,
            waiting_time: waiting.time,
            distance: tripInfo.distance,
        }, () => {
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        })
    };

    const callToClient = async () => {
        await Linking.openURL(`tel:+${newOrder.data.user.phone}`)
    };

    const setTime = (time: number) => {
        return `${pad(parseInt(String(time / 60)))}:${pad(time % 60)}`
    };

    const pad = (val: number) => {
        const valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    };

    let configureBackgroundGeolocation = () => {

        BackgroundGeolocation.configure({
            desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
            stationaryRadius: 5,
            distanceFilter: 5,
            notificationTitle: 'Snap Driver',
            notificationText: 'Работает в фоновом режиме',
            debug: false,
            startOnBoot: true,
            stopOnTerminate: true,
            locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
            interval: 5000,
            fastestInterval: 5000,
            activitiesInterval: 5000,
            stopOnStillActivity: false,
        });

        BackgroundGeolocation.on('location', (location) => {

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
                    SetTripInfo({
                        distance: prevDistance +
                            getDistance(
                                {
                                    latitude: latestItem.latitude,
                                    longitude: latestItem.longitude,
                                },
                                {
                                    latitude: location.latitude,
                                    longitude: location.longitude,

                                })
                    })
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
                })
                ;

                SetTripInfo({
                    routeCoordinates: prev.concat({
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }),
                    distance,
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
            console.log('fafa')
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

    return (
        <CurrentTripPanelView
            callToClient={callToClient}
            price={Math.ceil(newOrder.data?.rate.price_per_km * (tripInfo.distance / 1000).toFixed(2))}
            changeOrderStatus={changeOrderStatus}
            drivingTo={newOrder.data.routes[1] ? newOrder.data.routes[1].address : 'Не указано'}
            drivingFrom={newOrder.data?.routes[0]?.address}
            isVisible={newOrder.data.routes[1]}
            isLoading={isLoading}
            isWaiting={newOrder.data.status === OrderStatus.WAITING}
            waitingTime={setTime(waiting.time)}
            distance={(tripInfo.distance / 1000).toFixed(2)}
            openGoogleMaps={openGoogleMaps}
            wait={wait}
            duration={setTime(tripInfo.duration)}
        />
    );
};

export default CurrentTripPanelController;
