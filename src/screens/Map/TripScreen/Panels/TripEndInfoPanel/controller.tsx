import React from 'react';
import TripEndInfoPanelView from "./view";
import IAction from "@store/types/IAction";
import SCREENS from "@constants/screens";

interface IProps {
    ChangeOrderStatus: IAction;
    newOrder: any;
    waiting: any;
    tripInfo: any;
}

const TripEndInfoPanelPanelController = (
    {
        newOrder,
        ChangeOrderStatus,
        tripInfo,
        waiting,
    }: IProps) => {

    const changeOrderStatus = () => {
        ChangeOrderStatus({
            ...newOrder,
            status: 'rating'
        })
    };

    const setTime = (time: number) => {
        return `${pad(parseInt(String(time / 60)))}:${pad(time % 60)}`
    };

    const pad = (val: number) => {
        const valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    };

    return (
        <TripEndInfoPanelView
            changeOrderStatus={changeOrderStatus}
            newOrder={newOrder}
            waitingTime={setTime(waiting.time)}
            duration={setTime(tripInfo.duration)}
        />

    );
};

export default TripEndInfoPanelPanelController;
