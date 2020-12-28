import {connect,} from "react-redux";
import {bindActionCreators} from "redux";
import MainScreenController from "./controller";
import {GetCurrentLocation, SetDestination, SetDestinationDetails} from "@store/constants/map";
import user from "@store/actions/user";

const mapStateToProps = ({map: {currentLocation}, booking: {newOrder}}: any) => ({
    currentLocation,
    newOrder: newOrder.data,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    GetCurrentLocation: (payload: any) => ({
        type: GetCurrentLocation.SUCCESS,
        payload,
    }),
    SetDestinationDetails: (payload: any) => ({
        type: SetDestinationDetails.SUCCESS,
        payload
    }),
    SetDestination: () => ({
        type: SetDestination.SUCCESS,
        payload: null
    }),
    UpdateLocation: user.UpdateLocation
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreenController);
