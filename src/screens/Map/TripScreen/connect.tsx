import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import TripScreenController from "./controller";
import booking from "@store/actions/booking";
import {SendPush} from "@store/constants/booking";

const mapStateToProps = ({booking: {newOrder, tripInfo, waiting}, map: {destination}}: any) => ({
    newOrder,
    destination: destination.details,
    tripInfo,
    waiting
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        SetWaiting: booking.SetWaiting,
        SendPush: (payload: any) => ({
            type: SendPush.SUCCESS,
            payload
        }),
        ChangeOrderStatus: booking.ChangeOrderStatus,
        GetOrderInfo: booking.GetOrderInfo,
        SetTripInfo: booking.SetTripInfo,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripScreenController);
