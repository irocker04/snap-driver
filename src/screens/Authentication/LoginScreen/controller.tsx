import React, {useEffect, useState} from 'react';
import LoginScreenView from "./view";
import {useNavigation} from "@react-navigation/native";
import {Alert} from "react-native";
import colors from "@constants/colors";
import SCREENS from "@constants/screens";
import IAction from "@store/types/IAction";

interface IProps {
    Login: IAction;
}

const LoginScreenController = ({Login}: IProps) => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = () => {
        setIsLoading(true);
        const normalizedPhone = '998' + phoneNumber.split(' ').join('');
        Login({
            phone: normalizedPhone,
            role: 'driver'
        }, ({data}) => {
            setIsLoading(false);
            navigation.navigate(SCREENS.ENTER_CODE, {
                id: data.user_id,
            })
        }, () => {
            Alert.alert('Ошибка', 'Вы не зарегистрированы как водитель или ввели неправильный номер, обратитесь в офисе Snap Taxi или позвоните по телефону +998555022525 что-бы стать водителем.')
            setIsLoading(false);
        })
    };


    return (
        <LoginScreenView
            handleSubmit={handleSubmit}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            isLoading={isLoading}
            isButtonDisabled={phoneNumber.length <  12}
        />
    );
};

export default LoginScreenController;
