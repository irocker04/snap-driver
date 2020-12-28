import {createAction} from "../utils";
import * as Map from "../constants/map";
import * as Booking from "@store/constants/booking";

const GetCurrentLocation = createAction(Map.GetCurrentLocation.SUCCESS);
const SetDestination = createAction(Map.SetDestination.REQUEST);
const SetDestinationDetails = createAction(Map.SetDestinationDetails.REQUEST);
const SetNetConnection = createAction(Booking.SetNetConnection.SUCCESS);


export default {
    GetCurrentLocation,
    SetDestination,
    SetDestinationDetails,
    SetNetConnection,
}
