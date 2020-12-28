import { put, takeLatest, call, all } from 'redux-saga/effects';
import io from 'socket.io-client';
import Echo from 'laravel-echo';

var Sound = require('react-native-sound');
import api from '../../services/api';
import * as Booking from '../constants/booking';
import OrderStatus from '@constants/orderStatus';
import reactotron from '../ReactotronConfig';

let echo: any;

export { echo };

function* SetDriverStatusOnline(action: any) {
  try {
    echo = new Echo({
      host: 'https://snaptaxi.uz:6060',
      broadcaster: 'socket.io',
      client: io,
    });

    echo
      .channel(`snaptaxi_database_car.${action.payload.carId}`)
      .listen('.SearchEvent', ({ booking }: any) => {});

    yield put({
      type: Booking.SetDriverStatusOnline.SUCCESS,
    });
  } catch (error) {
    yield put({
      type: Booking.SetDriverStatusOnline.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* SetDriverStatusOffline(action: any) {
  try {
    echo && echo.disconnect();

    yield put({
      type: Booking.SetDriverStatusOffline.SUCCESS,
    });

    yield call(action.cb);
  } catch (error) {
    yield put({
      type: Booking.SetDriverStatusOffline.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* NewOrder(action: any) {
  try {
    yield put({
      type: Booking.NewOrder.SUCCESS,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: Booking.NewOrder.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* AcceptNewOrder(action: any) {
  echo = new Echo({
    host: 'https://snaptaxi.uz:6060',
    broadcaster: 'socket.io',
    client: io,
  });

  try {
    const { orderId, driverId } = action.payload;

    const { data } = yield call(
      api.request.put,
      `/car-booking/status/${orderId}`,
      {
        status: 'accepted',
        driver_id: driverId,
      },
    );

    const canceledSound = new Sound('find_car.mp3', Sound.MAIN_BUNDLE, () => {
      if (canceledSound) {
        canceledSound.play();
      }
    });

    echo
      .channel(`snaptaxi_database_car_order.${orderId}`)
      .listen('.OrderStatusEvent', (orderInfo: any) => {
        if (orderInfo.booking.status === 'canceled') {
          action.cb().socketCb();
        }
      });

    yield put({
      type: Booking.AcceptNewOrder.SUCCESS,
      payload: data.data,
    });

    yield call(action.cb().cb);
  } catch (error) {
    yield put({
      type: Booking.AcceptNewOrder.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* ChangeOrderStatus(action: any) {
  try {
    const { orderStatus, driverId, orderId } = action.payload;

    const { data } = yield call(
      api.request.put,
      `/car-booking/status/${orderId}`,
      {
        status: orderStatus,
        driver_id: driverId,
        ...action.payload,
      },
    );

    if (orderStatus !== OrderStatus.WAITING) {
      const canceledSound = new Sound('find_car.mp3', Sound.MAIN_BUNDLE, () => {
        if (canceledSound) {
          canceledSound.play();
        }
      });
    }

    yield put({
      type: Booking.ChangeOrderStatus.SUCCESS,
      payload: data.data,
    });

    yield call(action.cb);
  } catch (error) {
    yield put({
      type: Booking.ChangeOrderStatus.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* GetOrderList(action: any) {
  try {
    const { data } = yield call(
      api.request.get,
      '/car-booking',
      action.payload,
    );

    yield put({
      type: Booking.GetOrderList.SUCCESS,
      payload: data.data,
    });

    yield call(action.cb, data);
  } catch (error) {
    yield put({
      type: Booking.GetOrderList.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* RateOrder(action: any) {
  try {
    const { orderId } = action.payload;

    const { data } = yield call(
      api.request.put,
      `/car-booking/review/${orderId}`,
      action.payload,
    );

    yield put({
      type: Booking.RateOrder.SUCCESS,
      payload: data.data,
    });

    yield call(action.cb);
  } catch (error) {
    yield put({
      type: Booking.RateOrder.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* SendPush(action: any) {
  try {
    const { data } = yield call(
      api.request.post,
      '/car-booking/send-push',
      action.payload,
    );

    yield put({
      type: Booking.SendPush.SUCCESS,
      payload: {
        ...action.payload,
        type: 'send',
        id: Math.random(),
      },
    });

    yield call(action.cb);
  } catch (error) {
    yield put({
      type: Booking.SendPush.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

function* GetOrderInfo(action: any) {
  try {
    echo = new Echo({
      host: 'https://snaptaxi.uz:6060',
      broadcaster: 'socket.io',
      client: io,
    });

    const { data } = yield call(
      api.request.get,
      `/car-booking/details/${action.payload}`,
    );

    echo
      .channel(`snaptaxi_database_car_order.${action.payload}`)
      .listen('.OrderStatusEvent', (orderInfo: any) => {
        if (orderInfo.booking.status === 'canceled') {
          action.cb(orderInfo);
        }
      });

    yield put({
      type: Booking.GetOrderInfo.SUCCESS,
      payload: data.data,
    });

    yield put({
      type: Booking.ChangeOrderStatus.SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    yield put({
      type: Booking.GetOrderInfo.FAILURE,
      payload: error,
    });

    yield call(action.errorCb, error);
  }
}

export default function* root() {
  yield all([
    takeLatest(Booking.SetDriverStatusOnline.REQUEST, SetDriverStatusOnline),
    takeLatest(Booking.SetDriverStatusOffline.REQUEST, SetDriverStatusOffline),
    takeLatest(Booking.NewOrder.REQUEST, NewOrder),
    takeLatest(Booking.AcceptNewOrder.REQUEST, AcceptNewOrder),
    takeLatest(Booking.ChangeOrderStatus.REQUEST, ChangeOrderStatus),
    takeLatest(Booking.GetOrderList.REQUEST, GetOrderList),
    takeLatest(Booking.RateOrder.REQUEST, RateOrder),
    takeLatest(Booking.SendPush.REQUEST, SendPush),
    takeLatest(Booking.GetOrderInfo.REQUEST, GetOrderInfo),
  ]);
}
