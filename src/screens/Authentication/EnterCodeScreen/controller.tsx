import colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import IAction from '@store/types/IAction';
import React, {useEffect, useState} from 'react';
import {
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import EnterCodeView from './view';

import PushNotification from 'react-native-push-notification';

interface IProps {
    route: any;
    VerifyCode: IAction;
    ResendCode: IAction;
    GetProfile: IAction;
    GetCar: IAction;
    SendPush: any;
}

const EnterCodeScreenController = ({
    route,
    VerifyCode,
    ResendCode,
    GetProfile,
    GetCar,
}: IProps) => {
    const navigation = useNavigation();
    const [error, setError] = useState(false);
    const [fcmToken, setFcmToken] = useState(null);
    const [value, setValue] = useState('');
    const codeFieldRef = useBlurOnFulfill({value, cellCount: 5});
    const [codeFieldProps, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const [counter, setCounter] = useState(30);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        PushNotification.configure({
            onRegister: (data: any) => {
                setFcmToken(data.token);
            },
            onNotification: (notification: any) => {
            },
            permissions: {
                alert: true,
                badge: true,
                sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
    }, []);

    useEffect(() => {
        if (!counter) return;

        const intervalId = setInterval(() => {
            setCounter((prevState) => prevState - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [counter]);

    const handleSubmit = () => {
        setIsLoading(true);
        const {id} = route.params;
        VerifyCode(
            {
                id,
                code: value,
                fcm_token: fcmToken,
            },
            () => {
                GetCar(null, () => {
                    GetProfile(null, () => {
                        setIsLoading(false);
                    });
                });
            },
            () => {
                setError(true);
                setIsLoading(false);
            },
        );
    };

    const resend = () => {
        const {id} = route.params;
        setCounter(30);
        ResendCode(
            id,
            ({data}) => {
                setIsLoading(false);
                setValue('');
            },
            (error) => {
                setIsLoading(false);
            },
        );
    };

    return (
        <EnterCodeView
            handleSubmit={handleSubmit}
            codeFieldProps={codeFieldProps}
            getCellOnLayoutHandler={getCellOnLayoutHandler}
            codeFieldRef={codeFieldRef}
            codeFieldValue={value}
            setCodeFieldValue={(text) => {
                setValue(text);
                error && setError(false);
            }}
            isButtonDisabled={value.length < 5}
            counter={counter}
            resend={resend}
            error={error}
            isLoading={isLoading}
        />
    );
};

export default EnterCodeScreenController;
