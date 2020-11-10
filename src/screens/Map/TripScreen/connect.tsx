import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import TripScreenController from "./controller";
import booking from "@store/actions/booking";

const mapStateToProps = ({booking: {newOrder, tripInfo, waiting}, map: {destination}}: any) => ({
    newOrder,
    destination: destination.details,
    tripInfo,
    waiting
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        SetWaiting: booking.SetWaiting,
        ChangeOrderStatus: booking.ChangeOrderStatus,
        SetTripInfo: booking.SetTripInfo,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripScreenController);
