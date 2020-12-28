import {VerifyCode} from "../constants/auth";
import {GetCar, GetNotifications, GetProfile, UpdateProfile} from "../constants/user";

const initialState = {
    token: null,
    isAuthenticated: false,
    data: [],
    isRegistered: false,
    car: {},
    notifications: {
        unread: 0,
        data: [],
    }
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case  VerifyCode.SUCCESS:
            const {token} = action.payload;
            return {
                ...state,
                token: token,
                isAuthenticated: false,
                data: []
            };
        case  GetProfile.SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                data: action.payload
            };
        case  UpdateProfile.SUCCESS:
            return {
                ...state,
                data: action.payload
            };
        case  GetCar.SUCCESS:
            return {
                ...state,
                car: {
                    ...state.car,
                    ...action.payload,
                }
            };
        case  GetNotifications.SUCCESS:
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    unread: action.payload.filter(item => !item.read).length,
                    data: action.payload
                }
            };
        case 'LOGOUT': {
            return  initialState;
        }
        default:
            return state
    }
}
