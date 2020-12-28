import React, {useState} from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import CustomSwitch from '@components/common/CustomSwitch';
import Icon from '@assets/icons';
import strings from '@constants/strings';
import colors from '@constants/colors';
import constStyles from '@constants/constStyles';
import styles from "./styles";
import {useDispatch} from "react-redux";

interface SettingsProps {
}

const SettingsScreenView = ({}: SettingsProps) => {
    let [darkMode, setDarkMode] = useState(false);
    let [audio, setAudio] = useState(false);

    const dispatch = useDispatch();

    const logout = () => {
        Alert.alert('Выйти из аккаунта', 'Вы уверены что хотите выйти из аакунта?', [
            {text: 'Отмена'},
            {text: 'Выйти', onPress: () => dispatch({type: 'LOGOUT'})}
        ])
    };

    return (
        <View style={styles.container}>
            <View style={[styles.bar, styles.bottomBorder]}>
                <Text
                    style={[
                        constStyles.bold,
                        {
                            color: darkMode ? colors.blue : colors.black,
                        },
                    ]}>
                    {!darkMode
                        ? strings.switchDarkMode
                        : strings.switchLightMode}
                </Text>
                <CustomSwitch
                    value={darkMode}
                    onValueChange={() => {
                        setDarkMode(!darkMode);
                    }}
                />
            </View>
            <View style={styles.bar}>
                <Text style={[styles.text, constStyles.bold]}>
                    {strings.appLanguage}
                </Text>
                <Icon name="angleRight" size={10} style={{paddingRight: 15}}/>
            </View>
            <TouchableOpacity style={styles.bar} onPress={logout}>
                <Text style={[styles.text, constStyles.bold]}>Выйти из аккаунта</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreenView;
