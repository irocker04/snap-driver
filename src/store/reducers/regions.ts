import {GetRegions} from "../constants/regions";

const initialState = {
    data: []
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case  GetRegions.SUCCESS:
            return {
                data: action.payload
            };
        case 'LOGOUT': {
            return initialState;
        }
        default:
            return state
    }
}
