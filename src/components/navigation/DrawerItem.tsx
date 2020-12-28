import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import constStyles from '../../constants/constStyles';
import colors from '../../constants/colors';
import {StackNavigationProp} from "@react-navigation/stack";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";

interface DrawerItemProps {
    item: {
        name: string;
        label: string;
    };
    navigation: StackNavigationProp<any>;
}

const DrawerItem = ({item, navigation}: DrawerItemProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(item.name);
                }}>
                <Text style={[constStyles.medium, styles.text]}>
                    {item.label}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderBottomColor: colors.superPaleGray,
        borderBottomWidth: 1,
    },
    text: {
        fontSize: RFValue(17, 812),
    },
});

export default DrawerItem;
