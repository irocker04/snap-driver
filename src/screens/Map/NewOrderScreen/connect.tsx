import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import NewOrderScreenController from "./controller";
import booking from "@store/actions/booking"

const mapStateToProps = ({booking: {newOrder}, user, map: {destination}}: any) => ({
    newOrder,
    user,
    destination
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        AcceptNewOrder: booking.AcceptNewOrder,
        SkipNewOrder: booking.SkipNewOrder,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NewOrderScreenController);
