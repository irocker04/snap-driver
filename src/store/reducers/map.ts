import {GetCurrentLocation, SetDestination, SetDestinationDetails, SetNetConnection} from "../constants/map";

const initialState = {
    currentLocation: {},
    destination: {
        details: {}
    },
    isNetConnected: false
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case  GetCurrentLocation.SUCCESS:
            return {
                ...state,
                currentLocation: action.payload
            };
        case SetDestination.SUCCESS:
            return {
                ...state,
                destination: action.payload
            };
        case SetDestinationDetails.SUCCESS:
            return {
                ...state,
                destination: {
                    details: action.payload
                }
            };
        case SetNetConnection.SUCCESS:
            return {
                ...state,
                isNetConnected: action.payload
            };
        case 'LOGOUT': {
            return  initialState;
        }
        default:
            return state
    }
}
