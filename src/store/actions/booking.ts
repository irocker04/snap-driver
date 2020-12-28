import {createAction} from "../utils";
import * as Booking from "../constants/booking";

const SetDriverStatusOnline = createAction(Booking.SetDriverStatusOnline.REQUEST);
const SetDriverStatusOffline = createAction(Booking.SetDriverStatusOffline.REQUEST);
const NewOrder = createAction(Booking.NewOrder.REQUEST);
const SkipNewOrder = createAction(Booking.SkipNewOrder.REQUEST);
const AcceptNewOrder = createAction(Booking.AcceptNewOrder.REQUEST);
const CancelOrder = createAction(Booking.CancelOrder.REQUEST);
const ChangeOrderStatus = createAction(Booking.ChangeOrderStatus.REQUEST);
const SetWaiting = createAction(Booking.SetWaiting.SUCCESS);
const GetOrderList = createAction(Booking.GetOrderList.REQUEST);
const RateOrder = createAction(Booking.RateOrder.REQUEST);
const SendPush = createAction(Booking.SendPush.REQUEST);
const GetOrderInfo = createAction(Booking.GetOrderInfo.REQUEST);
const Reset = createAction(Booking.Reset.SUCCESS);
const SetTripInfo = createAction(Booking.SetTripInfo.SUCCESS);
const SetMessagesRead = createAction(Booking.SetMessagesRead.SUCCESS);

export default {
    SetDriverStatusOnline,
    SetDriverStatusOffline,
    NewOrder,
    SkipNewOrder,
    AcceptNewOrder,
    CancelOrder,
    ChangeOrderStatus,
    SetWaiting,
    GetOrderList,
    RateOrder,
    SendPush,
    GetOrderInfo,
    Reset,
    SetTripInfo,
    SetMessagesRead,
}
