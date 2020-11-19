import {bindActionCreators, Dispatch} from "redux";
import {connect} from "react-redux";

import TripEndInfoPanelPanelController from "./controller";
import {ChangeOrderStatus} from "@store/constants/booking";

const mapStateToProps = ({booking: {newOrder, waiting, tripInfo}}: any) => ({
    newOrder: newOrder.data,
    waiting,
    tripInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({
        ChangeOrderStatus: (payload) => ({
            type: ChangeOrderStatus.SUCCESS,
            payload
        }),
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TripEndInfoPanelPanelController);
