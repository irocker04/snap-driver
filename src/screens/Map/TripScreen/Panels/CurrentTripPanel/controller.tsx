import React, {useState} from 'react';
import CurrentTripPanelView from "./view";
import IAction from "@store/types/IAction";
import OrderStatus from "@constants/orderStatus";
import {Linking, Platform} from "react-native";

interface IProps {
    ChangeOrderStatus: IAction;
    newOrder: any;
    destination: any;
    waiting: any;
    tripInfo: any;
}

const CurrentTripPanelController = ({ChangeOrderStatus, waiting, newOrder, destination, tripInfo}: IProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const openGoogleMaps = () => {
        const {routes} = newOrder.data;
        const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
        const latLng = `${routes[1].lat},${routes[1].lng}`;
        const url = Platform.select({
            ios: `${scheme}@${latLng}`,
            android: `${scheme}${latLng}`
        });

        Linking.openURL(url as string).then();
    };

    const wait = () => {
        const {data} = newOrder;
        ChangeOrderStatus({
            driver_id: data.driver.user_id,
            orderId: data.id,
            orderStatus: newOrder.data.status === OrderStatus.WAITING ? OrderStatus.PROCESSING : OrderStatus.WAITING
        }, () => {
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        });
    };

    const changeOrderStatus = () => {
        setIsLoading(true);
        const {data} = newOrder;
        ChangeOrderStatus({
            driver_id: data.driver.user_id,
            orderId: data.id,
            orderStatus: OrderStatus.DONE,
            waiting_time: waiting.time,
            distance: tripInfo.distance,
        }, () => {
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        })
    };

    const callToClient = async () => {
        await Linking.openURL(`tel:+${newOrder.data.user.phone}`)
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
        <CurrentTripPanelView
            callToClient={callToClient}
            price={newOrder.data?.rate.price_per_km * tripInfo.distance}
            changeOrderStatus={changeOrderStatus}
            drivingTo={newOrder.data.routes[1] ? newOrder.data.routes[1].address : 'Не указано'}
            drivingFrom={newOrder.data?.routes[0]?.address}
            isVisible={newOrder.data.routes[1]}
            isLoading={isLoading}
            isWaiting={newOrder.data.status === OrderStatus.WAITING}
            waitingTime={setTime(waiting.time)}
            distance={tripInfo.distance}
            openGoogleMaps={openGoogleMaps}
            wait={wait}
            duration={setTime(tripInfo.duration)}
        />
    );
};

export default CurrentTripPanelController;
