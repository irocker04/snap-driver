import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import CurrentTripPanelController from "./controller";
import booking from "@store/actions/booking";
import user from "@store/actions/user";

const mapStateToProps = ({booking: {newOrder, waiting, tripInfo}, map: {destination}, regions, user}: any) => ({
    newOrder,
    destination,
    waiting,
    tripInfo,
    regions,
    user,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        ChangeOrderStatus: booking.ChangeOrderStatus,
        SetTripInfo: booking.SetTripInfo,
        UpdateLocation: user.UpdateLocation
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentTripPanelController);
