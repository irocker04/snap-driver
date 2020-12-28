import NetInfo from '@react-native-community/netinfo';
import { StackNavigationProp } from '@react-navigation/stack';
import firebase from '@react-native-firebase/messaging';
import LaunchApplication from 'react-native-launch-application';
import IAction from '@store/types/IAction';
import React, { PureComponent } from 'react';
import MainScreenView from './view';
import SCREENS from '@constants/screens';
import { Alert } from 'react-native';

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
  user: any;
  UpdateLocation: IAction;
  ChangeOrderStatus: IAction;
  Reset: IAction;
  GetRegions: IAction;
  SetTripInfo: IAction;
  GetProfile: IAction;
  GetNotifications: IAction;
  SetDestinationDetails: IAction;
  GetCar: IAction;
  SendPush: any;
}

interface IState {
  showTariff: boolean;
}

class MainScreenController extends PureComponent<IProps, IState> {
  FCM;
  notificationListener;
  notificationListener2;

  constructor(props) {
    super(props);
    this.state = {
      showTariff: false,
    };
    this.FCM = firebase();
  }

  componentDidMount() {
    this.props.GetNotifications();

    this.props.GetRegions();

    // this.checkStatus();

    this.notificationListener = this.FCM.setBackgroundMessageHandler(
      async (msg) => {
        const notification: any = msg;
        this.notificationHandler(notification);
      },
    );

    this.notificationListener2 = this.FCM.onMessage((msg) => {
      const notification: any = msg;
      this.notificationHandler(notification);
    });
    this.props.Reset();
    NetInfo.addEventListener((state) => {
      this.props.SetNetConnection(
        state.isConnected && state.isInternetReachable,
      );
    });

    this.props.navigation.addListener('focus', () => {
      this.props.SetDestinationDetails({});
      this.props.GetProfile();
      this.props.GetCar();
    });

    if (this.props.user.balance === 0 || this.props.user.balance < 0) {
      this.props.SetDriverStatusOffline();
    }
  }

  notificationHandler = (notification: any) => {
    const { driver, NewOrder, SendPush, user } = this.props;

    if (user.balance > 0) {
      const bookingInfo = notification.data.booking_info;

      if (driver.status && bookingInfo) {
        !driver.isBusy && NewOrder(JSON.parse(bookingInfo));
        return LaunchApplication.open('com.snapdriver');
      }
    }
    // this.checkStatus();
    if (notification) {
      this.props.GetNotifications();
    }
  };

  checkStatus = () => {
    const { driver, SetDriverStatusOnline, NewOrder, car } = this.props;
    if (driver.status) {
      SetDriverStatusOnline(
        {
          carId: car.id,
        },
        (data) => {
          !driver.isBusy && NewOrder(data);
        },
      );
    }
  };

  routeTo = (screen: string) => () => {
    this.props.navigation.navigate(screen);
  };

  changeDriverStatus = () => {
    const {
      driver,
      SetDriverStatusOnline,
      SetDriverStatusOffline,
      car,
      NewOrder,
      user,
    } = this.props;
    if (driver.status) {
      SetDriverStatusOffline();
    } else {
      if (user.balance > 0) {
        SetDriverStatusOnline(
          {
            carId: car.id,
          },
          (bookingInfo) => {
            // !driver.isBusy && NewOrder(bookingInfo);
          },
        );
      } else {
        Alert.alert(
          'Внимание',
          'Уважаемый водитель пополните свой баланс, у вас не достаточно средств на счету!',
        );
      }
    }
  };

  render() {
    let { driver, newOrder, isNetConnected, car, GetCar } = this.props;

    return (
      <MainScreenView
        getCar={GetCar}
        isNetConnected={isNetConnected}
        goToChat={this.routeTo(SCREENS.NOTIFICATIONS)}
        setShowTariff={() =>
          this.setState({ showTariff: !this.state.showTariff })
        }
        showTariff={this.state.showTariff}
        driverStatus={driver.status}
        changeDriverStatus={this.changeDriverStatus}
        isModalVisible={newOrder.isModalVisible}
        rates={car.rates}
      />
    );
  }
}

export default MainScreenController;
