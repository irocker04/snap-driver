import React, { useState, useEffect } from 'react';
import { Alert, Vibration } from 'react-native';
import NewOrderScreenView from './view';
import IAction from '@store/types/IAction';
import { useNavigation } from '@react-navigation/native';
import SCREENS from '@constants/screens';

var Sound = require('react-native-sound');

interface IProps {
  newOrder: any;
  SkipNewOrder: IAction;
  AcceptNewOrder: IAction;
  user: any;
  destination: any;
}

const NewOrderScreenController = ({
  newOrder,
  SkipNewOrder,
  AcceptNewOrder,
  user,
  destination,
}: IProps) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [sound, setSound] = useState(
    new Sound('new_order.mp3', Sound.MAIN_BUNDLE, () => {
      if (sound) {
        sound.play();
      }
    }),
  );

  useEffect(() => {
    const PATTERN = [1000, 750, 1000, 750, 1000, 750, 1000, 750];
    Vibration.vibrate(PATTERN);
    () => sound.stop(() => {});
  }, []);

  const stopNotify = () => {
    Vibration.cancel();
    if (sound) {
      sound.stop();
    }
    setSound(null);
  };

  const handleOrderCancel = () => {
    SkipNewOrder();
    navigation.reset({
      index: 0,
      routes: [{ name: SCREENS.MAP }],
    });
  };

  const acceptNewOrder = () => {
    setIsLoading(true);
    stopNotify();
    AcceptNewOrder(
      {
        orderId: newOrder.data.id,
        driverId: user.data.user_id,
      },
      () => {
        return {
          cb: () => {
            setIsLoading(false);
            navigation.reset({
              index: 0,
              routes: [{ name: SCREENS.TRIP }],
            });
          },
          socketCb: () => {
            const cancelSound = new Sound(
              'canceled_order.mp3',
              Sound.MAIN_BUNDLE,
              () => {
                cancelSound.play();
              },
            );
            Alert.alert('Отмена заказа', 'Ваш заказ был отменён', [
              {
                text: 'Ок',
                onPress: handleOrderCancel,
              },
            ]);
          },
        };
      },
      () => {
        setIsLoading(false);
      },
    );
  };

  return (
    <NewOrderScreenView
      visible={newOrder.isModalVisible}
      orderDetails={newOrder.data}
      skipNewOrder={() => {
        SkipNewOrder();
        stopNotify();
      }}
      distance={destination?.details?.distance}
      acceptNewOrder={acceptNewOrder}
      isLoading={isLoading}
    />
  );
};

export default NewOrderScreenController;
