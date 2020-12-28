import React, { useState, useEffect } from 'react';
import CurrentTripPanelView from './view';
import IAction from '@store/types/IAction';
import OrderStatus from '@constants/orderStatus';
import { Alert, Linking, Platform } from 'react-native';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { getDistance } from 'geolib';
import { formData } from '@store/utils';

import GeoFencing from 'react-native-geo-fencing';

interface IProps {
  ChangeOrderStatus: IAction;
  UpdateLocation: IAction;
  SetTripInfo: IAction;
  newOrder: any;
  destination: any;
  waiting: any;
  tripInfo: any;
  regions: any;
  user: any;
}

const CurrentTripPanelController = ({
  ChangeOrderStatus,
  waiting,
  newOrder,
  destination,
  regions,
  SetTripInfo,
  UpdateLocation,
  tripInfo,
  user,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [slocation, setLocation] = useState(
    tripInfo.routeCoordinates.reverse(),
  );
  const [history, setHistory] = useState<any>(tripInfo.routeCoordinates);
  const [distance, setDistance] = useState<number>(tripInfo.distance);
  const [outOfPolygon, setOutOfPolygon] = useState([]);

  useEffect(() => {
    configureBackgroundGeolocation();
  }, []);

  const openGoogleMaps = () => {
    const { routes } = newOrder.data;
    if (routes[1]?.lng) {
      const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
      });
      const latLng = `${routes[1].lat},${routes[1].lng}`;
      const url = Platform.select({
        ios: `${scheme}@${latLng}`,
        android: `${scheme}${latLng}`,
      });

      Linking.openURL(url as string).then();
    } else {
      Linking.openURL('geo://').then();
    }
  };

  const wait = () => {
    const { data } = newOrder;
    ChangeOrderStatus(
      {
        driver_id: data.driver.user_id,
        orderId: data.id,
        orderStatus:
          newOrder.data.status === OrderStatus.WAITING
            ? OrderStatus.PROCESSING
            : OrderStatus.WAITING,
      },
      () => {
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  const changeOrderStatus = () => {
    BackgroundGeolocation.stop();
    setIsLoading(true);
    const { data } = newOrder;
    ChangeOrderStatus(
      {
        driver_id: data.driver.user_id,
        orderId: data.id,
        orderStatus: OrderStatus.DONE,
        waiting_time: waiting.time,
        distance: tripInfo.distance / 1000,
      },
      () => {
        setIsLoading(false);
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  const callToClient = async () => {
    await Linking.openURL(`tel:+${newOrder.data.user.phone}`);
  };

  const setTime = (time: number) => {
    return `${pad(parseInt(String(time / 60)))}:${pad(time % 60)}`;
  };

  const pad = (val: number) => {
    const valString = val + '';
    if (valString.length < 2) {
      return '0' + valString;
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
      UpdateLocation(
        formData({
          lng: location.longitude,
          lat: location.latitude,
        }),
      );
      setLocation((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      if (regions.data && regions.data[0].polygon[0]) {
        GeoFencing.containsLocation(
          {
            lat: location.latitude,
            lng: location.longitude,
          },
          regions.data[0].polygon[0],
        ).then(() =>
          setOutOfPolygon((prev) => ({
            ...prev,
            latitude: location.latitude,
            longitude: location.longitude,
          })),
        );
      }

      setHistory((prev) => {
        setDistance((prevDistance) => {
          if (prev.length === 0) {
            return 0;
          }
          const latestItem = prev[prev.length - 1];
          SetTripInfo({
            distance:
              prevDistance +
              getDistance(
                {
                  latitude: latestItem.latitude,
                  longitude: latestItem.longitude,
                },
                {
                  latitude: location.latitude,
                  longitude: location.longitude,
                },
              ),
          });
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
              },
            )
          );
        });

        SetTripInfo({
          routeCoordinates: prev.splice(1).concat({
            latitude: location.latitude,
            longitude: location.longitude,
          }),
          distance,
          outOfPolygon,
        });

        return prev.splice(1).concat({
          latitude: location.latitude,
          longitude: location.longitude,
        });
      });

      BackgroundGeolocation.startTask((taskKey) => {
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('authorization', (status) => {
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
                  onPress: () => BackgroundGeolocation.showAppSettings(),
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

    BackgroundGeolocation.checkStatus(({ isRunning }) => {
      if (!isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
  };

  const calculatePrice = () => {
    if (waiting.time - 180 > 0) {
      if (tripInfo.distance / 1000 < 3) {
        return (
          newOrder.data.rate.min_price +
          Math.ceil((waiting.time - 180) / 60) * newOrder.data?.rate.price_per_min +
          Math.ceil(
            newOrder.data?.rate.price_per_km *
              (tripInfo.distance / 1000).toFixed(2),
          )
        );
      } else {
        return (
          newOrder.data.rate.min_price +
          Math.ceil((waiting.time - 180) / 60) * newOrder.data?.rate.price_per_min +
          Math.ceil(
            newOrder.data?.rate.price_per_km *
              (tripInfo.distance / 1000).toFixed(2),
          )
        );
      }
    } else {
      if (tripInfo.distance / 1000 < 3) {
        return (
          newOrder.data.rate.min_price +
          Math.ceil(
            newOrder.data?.rate.price_per_km *
              (tripInfo.distance / 1000).toFixed(2),
          )
        );
      } else {
        return (
          newOrder.data.rate.min_price +
          Math.ceil(
            newOrder.data?.rate.price_per_km *
              (tripInfo.distance / 1000).toFixed(2),
          )
        );
      }
    }
  };

  return (
    <CurrentTripPanelView
      callToClient={callToClient}
      price={calculatePrice()}
      changeOrderStatus={changeOrderStatus}
      drivingTo={
        newOrder.data.routes[1] ? newOrder.data.routes[1].address : 'Не указано'
      }
      drivingFrom={newOrder.data?.routes[0]?.address}
      isLoading={isLoading}
      isWaiting={newOrder.data.status === OrderStatus.WAITING}
      waitingTime={setTime(waiting.time)}
      distance={(tripInfo.distance / 1000).toFixed(2) as any}
      openGoogleMaps={openGoogleMaps}
      wait={wait}
      outOfPolygon={outOfPolygon.length}
      duration={setTime(tripInfo.duration)}
    />
  );
};

export default CurrentTripPanelController;
