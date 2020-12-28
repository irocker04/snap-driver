import React, {useEffect} from 'react';

import LanguageSelectView from "./view";
import {useNavigation} from "@react-navigation/native";
import SCREENS from "@constants/screens";
import colors from "@constants/colors";

const LanguageSelectScreenController = () => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate(SCREENS.LOGIN);
    };

    return (
        <LanguageSelectView
            onPress={onPress}
        />
    );
};

export default LanguageSelectScreenController;
