import React, {useState} from 'react';
import SelectNavigatorPanelView from "./view";
import IAction from "@store/types/IAction";
import OrderStatus from "@constants/orderStatus";
import {Linking, Platform} from "react-native";

interface IProps {
    ChangeOrderStatus: IAction;
    newOrder: any;
}

const SelectNavigatorPanelController = ({ChangeOrderStatus, newOrder}: IProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const openGoogleMaps = () => {
        const {routes} = newOrder;
        const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
        const latLng = `${routes[0].lat},${routes[0].lng}`;
        const url = Platform.select({
            ios: `${scheme}@${latLng}`,
            android: `${scheme}${latLng}`
        });

        Linking.openURL(url as string).then();
    };

    const changeOrderStatus = () => {
        setIsLoading(true);
        const {driver, id} = newOrder;
        ChangeOrderStatus({
            driver_id: driver.user_id,
            orderId: id,
            orderStatus: OrderStatus.ARRIVED
        }, () => {
            setIsLoading(false)
        }, () => {
            setIsLoading(false)
        })
    };

    const callToClient = async () => {
        await Linking.openURL(`tel:+${newOrder.user.phone}`)
    };

    return (
        <SelectNavigatorPanelView
            changeOrderStatus={changeOrderStatus}
            isLoading={isLoading}
            drivingFrom={newOrder?.routes[0]?.address}
            openGoogleMaps={openGoogleMaps}
            callToClient={callToClient}
        />

    );
};

export default SelectNavigatorPanelController;
