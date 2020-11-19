import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import RateOrderModalController from "./controller";
import booking from "@store/actions/booking";

const mapStateToProps = ({booking: {newOrder}}: any) => ({
    newOrder: newOrder.data
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    RateOrder: booking.RateOrder,
    SkipNewOrder: booking.SkipNewOrder,
    Reset: booking.Reset
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RateOrderModalController);
