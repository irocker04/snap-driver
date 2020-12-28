import {put, takeLatest, call, all} from "redux-saga/effects";
import api from "../../services/api";

import * as Regions from "../constants/regions";

function* GetRegions(action: any) {
    try {
        const {data} = yield call(api.request.get, '/handbook/regions');

        yield put({
            type: Regions.GetRegions.SUCCESS,
            payload: data.data,
        });

        yield call(action.cb, data);
    } catch (error) {
        yield put({
            type: Regions.GetRegions.FAILURE,
            payload: error
        });
        yield call(action.errorCb, error);
    }
}


export default function* root() {
    yield all([
        takeLatest(Regions.GetRegions.REQUEST, GetRegions),
    ]);
}
