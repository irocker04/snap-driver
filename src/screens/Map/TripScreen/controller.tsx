import React, { useEffect, useState } from 'react';
import { Alert, AppState, Linking } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import BackgroundTimer from 'react-native-background-timer';
import messaging from '@react-native-firebase/messaging';
import TripScreenView from './view';
import OrderStatus from '@constants/orderStatus';
import IAction from '@store/types/IAction';
import SCREENS from '@constants/screens';
import NetInfo from '@react-native-community/netinfo';

interface IProps {
  navigation: StackNavigationProp<any>;
  newOrder: any;
  destination: any;
  SetWaiting: any;
  SetTripInfo: any;
  tripInfo: any;
  waiting: any;
  ChangeOrderStatus: IAction;
  GetOrderInfo: IAction;
  SendPush: IAction;
}

const TripScreenController = ({
  SetWaiting,
  newOrder,
  destination,
  ChangeOrderStatus,
  navigation,
  SetTripInfo,
  tripInfo,
  waiting,
  GetOrderInfo,
  SendPush,
}: IProps) => {
  const FCM = messaging();

  const [orderStatus, setOrderStatus] = useState(OrderStatus.ACCEPTED);
  const [waitingTime, setWaitingTime] = useState(waiting.time);
  const [travelTime, setTravelTime] = useState(tripInfo.duration);
  const [intervalId, setIntervalId] = useState(null);
  const [distanceToClient] = useState(destination.distance | 0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      getCurrentOrder();
    });

    const _handler = (state) => {
      if (state === 'active') {
        getCurrentOrder();
      }
    };

    FCM.setBackgroundMessageHandler(async (msg) => {
      notificationHandler(msg.notification);
    });

    FCM.onMessage((msg) => {
      notificationHandler(msg.notification);
    });

    AppState.addEventListener('change', _handler);

    return () => {
      AppState.removeEventListener('change', _handler);
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    setOrderStatus(newOrder.data.status);

    if (newOrder.data.status === OrderStatus.PROCESSING) {
      SetWaiting({
        time: waitingTime,
        status: false,
      });
      BackgroundTimer.clearInterval(intervalId);
      return setIntervalId(
        BackgroundTimer.setInterval(() => {
          setTravelTime((prevState) => {
            SetTripInfo({
              duration: prevState + 1,
            });
            return prevState + 1;
          });
        }, 1000),
      );
    }

    if (newOrder.data.status === OrderStatus.WAITING) {
      SetWaiting({
        time: waitingTime,
        status: true,
      });
      BackgroundTimer.clearInterval(intervalId);
      return setIntervalId(
        BackgroundTimer.setInterval(() => {
          setWaitingTime((prevState) => {
            SetWaiting({
              time: prevState + 1,
              status: true,
            });
            return prevState + 1;
          });
        }, 1000),
      );
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
      setIntervalId(
        BackgroundTimer.setInterval(() => {
          setWaitingTime((prevState) => {
            SetWaiting({
              time: prevState + 1,
              status: true,
            });
            return prevState + 1;
          });
        }, 1000),
      );
    }
  }, [newOrder.data.status]);

  const notificationHandler = (notification: any) => {
    if (notification?.title === 'Сообщение') {
      return SendPush({
        id: Math.random(),
        message: notification.body,
        read: false,
      });
    }

    if (notification?.title === 'Выхожу') {
      return Alert.alert('Внимание', 'Клиент выходить');
    }
  };

  const getCurrentOrder = () => {
    if (newOrder.data.status !== 'rating' && newOrder.data.id) {
      GetOrderInfo(newOrder.data.id);
    }
  };

  const onPhonePress = async () => {
    await Linking.openURL(`tel:${newOrder.data.user.phone}`);
  };

  const cancelOrder = () => {
    const onSubmit = () => {
      setIsLoading(true);
      const { driver, id } = newOrder.data;
      ChangeOrderStatus(
        {
          driver_id: driver.user_id,
          orderId: id,
          orderStatus: OrderStatus.CANCELED,
        },
        () => {
          navigation.reset({
            index: 0,
            routes: [{ name: SCREENS.MAIN_STACK }],
          });
          setIsLoading(false);
        },
        () => {
          setIsLoading(false);
        },
      );
    };

    Alert.alert('Внимание!', 'Вы действительно хотите отменить заказ ?', [
      {
        text: 'Да',
        onPress: onSubmit,
      },
      {
        text: 'Нет',
      },
    ]);
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

  return (
    <TripScreenView
      isLoading={isLoading}
      waiting={setTime(waiting.time)}
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
