import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import MainScreenController from "./controller";
import booking from "@store/actions/booking";
import map from "@store/actions/map";
import user from "@store/actions/user";
import {SendPush} from "@store/constants/booking";

const mapStateToProps = ({booking: {driver, newOrder}, map: {isNetConnected}, user: {car}}: any) => ({
    driver,
    newOrder,
    isNetConnected,
    car,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        SetDriverStatusOnline: booking.SetDriverStatusOnline,
        SetDriverStatusOffline: booking.SetDriverStatusOffline,
        NewOrder: booking.NewOrder,
        UpdateLocation: user.UpdateLocation,
        SetNetConnection: map.SetNetConnection,
        GetProfile: user.GetProfile,
        GetOrderInfo: booking.GetOrderInfo,
        Reset: booking.Reset,
        SetTripInfo: booking.SetTripInfo,
        ChangeOrderStatus: booking.ChangeOrderStatus,
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
