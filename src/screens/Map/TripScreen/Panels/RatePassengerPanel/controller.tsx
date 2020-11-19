import React, {useState} from 'react';
import {useNavigation} from "@react-navigation/native";
import RatePassengerPanelView from "./view";
import IAction from "@store/types/IAction";
import SCREENS from "@constants/screens";

interface IProps {
    RateOrder: IAction;
    SkipNewOrder: IAction;
    Reset: IAction;
    newOrder: any;
}

const RatePassengerPanelController = ({RateOrder, newOrder, SkipNewOrder, Reset}: IProps) => {

    const [isLoading, setIsLoading] = useState(false);


    const navigation = useNavigation();

    const [review, setReview] = useState('');
    const [rate, setRate] = useState(5);

    const rateOrder = () => {
        setIsLoading(true);
        RateOrder({
            orderId: newOrder.id,
            comment: review,
            rating: rate
        }, () => {
            setIsLoading(false);
            Reset()
            navigation.reset({
                index: 0,
                routes: [{name: SCREENS.MAIN_STACK}]
            })
        })
    };

    return (
        <RatePassengerPanelView
            rateOrder={rateOrder}
            isLoading={isLoading}
            review={review}
            setReview={setReview}
            rate={rate}
            setRate={setRate}
        />

    );
};

export default RatePassengerPanelController;
