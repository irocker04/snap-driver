import {combineReducers} from "redux";
import user from "./user";
import map from "./map";
import booking from "./booking";
import regions from "./regions";


const appReducer = combineReducers({
    user,
    map,
    booking,
    regions,
});

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action)
};


export default rootReducer;
