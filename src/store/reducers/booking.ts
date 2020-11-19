import {
    AcceptNewOrder, ChangeOrderStatus, GetOrderList,
    NewOrder, SendPush,
    SetDriverStatusOffline,
    SetDriverStatusOnline,
    SetWaiting,
    SkipNewOrder,
    GetOrderInfo, Reset, SetTripInfo,
} from "../constants/booking";
import {uniqBy} from "lodash"
import OrderStatus from "@constants/orderStatus";

const initialState = {
    driver: {
        isBusy: false,
        status: false,
    },
    newOrder: {
        isModalVisible: false,
        data: {},
    },
    waiting: {
        time: 0,
        status: false,
    },
    list: {
        data: []
    },
    messages: {
        data: [],
    },
    tripInfo: {
        distance: 0,
        routeCoordinates: [],
        duration: 0
    }
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case  SetDriverStatusOnline.SUCCESS:
            return {
                ...state,
                driver: {
                    ...state.driver,
                    status: true
                }
            };
        case  SetDriverStatusOffline.SUCCESS:
            return {
                ...state,
                driver: {
                    isBusy: false,
                    status: false
                }
            };
        case NewOrder.SUCCESS: {
            if (!state.driver.isBusy) {
                return {
                    ...state,
                    driver: {
                        ...state.driver,
                        isBusy: true,
                    },
                    newOrder: {
                        isModalVisible: true,
                        data: action.payload,
                    },
                    messages: {
                        data: []
                    }
                }
            } else {
                console.log(state.driver.isBusy);
                return state;
            }
        }

        case SkipNewOrder.REQUEST: {
            return {
                ...state,
                waiting: initialState.waiting,
                driver: {
                    ...state.driver,
                    isBusy: false,
                },
                newOrder: {
                    isModalVisible: false,
                    data: {},
                }
            }
        }
        case AcceptNewOrder.SUCCESS: {
            return {
                ...state,
                driver: {
                    ...state.driver,
                    isBusy: true,
                },
                newOrder: {
                    data: action.payload,
                    isModalVisible: false,
                },
                messages: {
                    data: []
                }
            }
        }
        case AcceptNewOrder.FAILURE: {
            return {
                ...state,
                driver: {
                    isBusy: false,
                    status: true,
                },
                newOrder: {
                    isModalVisible: false,
                    data: {},
                },
                messages: {
                    data: []
                }
            }
        }
        case ChangeOrderStatus.SUCCESS: {
            if (action.payload.status === OrderStatus.CANCELED) {
                return {
                    ...state,
                    newOrder: {
                        data: {},
                        isModalVisible: false,
                    },
                    driver: {
                        ...state.driver,
                        isBusy: false
                    }
                }
            } else {
                return {
                    ...state,
                    driver: {
                        ...state.driver,
                        isBusy: true
                    },
                    newOrder: {
                        data: action.payload,
                        isModalVisible: false,
                    }
                }
            }
        }
        case SetWaiting.SUCCESS: {
            return {
                ...state,
                waiting: action.payload,
            }
        }
        case GetOrderList.SUCCESS: {
            return {
                ...state,
                list: {
                    data: action.payload
                },
            }
        }
        case SendPush.SUCCESS: {
            return {
                ...state,
                messages: {
                    data: uniqBy([...state.messages.data, action.payload], 'id')
                },
            }
        }
        case GetOrderInfo.SUCCESS: {
            return {
                ...state,
                newOrder: {
                    data: action.payload,
                    isModalVisible: false,
                },
            }
        }
        case Reset.SUCCESS: {
            return {
                ...state,
                newOrder: initialState.newOrder,
                messages: initialState.messages,
                waiting: initialState.waiting,
                tripInfo: initialState.tripInfo,
                driver: {
                    isBusy: false,
                    status: true,
                },
            }
        }
        case SetTripInfo.SUCCESS: {
            return {
                ...state,
                tripInfo: {
                    ...state.tripInfo,
                    ...action.payload
                }
            }
        }
        default:
            return state
    }
}
