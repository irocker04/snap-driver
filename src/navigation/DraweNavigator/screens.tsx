import strings from "@constants/strings";
import SCREENS from "@constants/screens";
import React from "react";

import MainStack from "../StackNavigators/MainStack";
import SettingsStack from "../StackNavigators/SettingsStack";
import BalanceStack from "../StackNavigators/BalanceStack";
import EarningsStack from "../StackNavigators/EarningsStack";
import OrdersStack from "../StackNavigators/OrdersStack";
import SupportStack from "../StackNavigators/SupportStack";

interface IScreenProps {
    label: any | null,
    name: string;
    component: React.JSXElementConstructor<any> | null
}

const screens: IScreenProps[] = [
    {
        label: strings.earnings,
        name: SCREENS.EARNINGS_STACK,
        component: EarningsStack,
    },
    // {
    //     label: strings.balance,
    //     name: SCREENS.BALANCE_STACK,
    //     component: BalanceStack,
    // },
    {
        label: strings.orders,
        name: SCREENS.ORDERS_STACK,
        component: OrdersStack,
    },
    {
        label: strings.setting,
        name: SCREENS.SETTINGS_STACK,
        component: SettingsStack,
    },
    {
        label: strings.supportService,
        name: SCREENS.SUPPORT_STACK,
        component: SupportStack,
    },

];

export {
    screens,
}

export type {
    IScreenProps
}
