import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import ChatScreenController from "./controller";
import booking from "@store/actions/booking";
import {SetMessagesRead} from "@store/constants/booking";

const mapStateToProps = ({booking: {newOrder, messages}}: any) => ({
    newOrder: newOrder.data,
    messages: messages.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    SendPush: booking.SendPush,
    SetMessagesRead: () => ({
        type: SetMessagesRead.SUCCESS
    }),
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatScreenController)
