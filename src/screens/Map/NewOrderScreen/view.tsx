import React from 'react';
import { Text, Image, View, Modal } from 'react-native';

import constStyles from '@constants/constStyles';
import strings from '@constants/strings';
import PulseCountDown from '@components/common/PulseCountDown';
import InfoCard from '@components/cards/InfoCard';
import images from '@assets/images';
import Button from '@components/common/Button';
import styles from './styles';

interface IProps {
  visible: boolean;
  skipNewOrder: () => void;
  acceptNewOrder: () => void;
  orderDetails: any;
  distance: any;
  isLoading: boolean;
}

const NewOrderScreenView = ({
  visible,
  skipNewOrder,
  acceptNewOrder,
  orderDetails,
  isLoading,
  distance,
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
                {orderDetails.car_type.min_price}
              </Text>
              <Text style={[styles.text, constStyles.light]}>
                Комиссия: {orderDetails.car_type.commission}%
              </Text>
            </View>
            <Text style={[styles.distance, constStyles.medium]}>
              {distance} км
            </Text>
          </View>
          <View style={[styles.rowWrapper, styles.bottomBorder]}>
            <Image style={styles.location} source={images.location} />
            <View style={styles.row}>
              <Text style={[styles.text, constStyles.light]}>
                {strings.drivingFrom}
              </Text>
              <Text style={[styles.locationText, constStyles.bold]}>
                {orderDetails.id && orderDetails.routes[0].address}
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
          {orderDetails.comment && <InfoCard message={orderDetails.comment} />}
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            fontSize={18}
            text={strings.accept as string}
            onPress={acceptNewOrder}
            isLoading={isLoading}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NewOrderScreenView;
