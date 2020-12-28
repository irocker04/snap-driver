import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import MainScreenController from "./controller";
import booking from "@store/actions/booking";
import map from "@store/actions/map";
import user from "@store/actions/user";
import regions from "@store/actions/regions";
import {SendPush} from "@store/constants/booking";
import {SetDestinationDetails} from "@store/constants/map";

const mapStateToProps = ({booking: {driver, newOrder}, map: {isNetConnected}, user: {car,data, notifications}}: any) => ({
    driver,
    newOrder,
    isNetConnected,
    car,
    user: data,
    notifications: notifications.data
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        SetDriverStatusOnline: booking.SetDriverStatusOnline,
        SetDriverStatusOffline: booking.SetDriverStatusOffline,
        NewOrder: booking.NewOrder,
        GetRegions: regions.GetRegions,
        GetNotifications: user.GetNotifications,
        UpdateLocation: user.UpdateLocation,
        SetNetConnection: map.SetNetConnection,
        GetProfile: user.GetProfile,
        GetCar: user.GetCar,
        GetOrderInfo: booking.GetOrderInfo,
        Reset: booking.Reset,
        SetTripInfo: booking.SetTripInfo,
        ChangeOrderStatus: booking.ChangeOrderStatus,
        SetDestinationDetails: (payload: any) => ({
            type: SetDestinationDetails.SUCCESS,
            payload
        }),
        SendPush: (payload: any) => ({
            type: SendPush.SUCCESS,
            payload
        })
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreenController);
