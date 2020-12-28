import React from 'react';
import {StyleSheet, Text, View, LayoutAnimation} from 'react-native';
import constStyles from '@constants/constStyles';
import colors from '@constants/colors';
import TouchablePlatformSpecific from '../common/TouchablePlatformSpecific';

interface TariffCardProps {
    name: string;
    active: boolean;
    minPrice: number;
}

const TariffCard = (
    {
        name,
        minPrice,
        active
    }: TariffCardProps) => {

    return (
        <View style={styles.plane}>
            <View style={[styles.container, active && {backgroundColor: colors.blue}]}>
                <Text style={[styles.name, constStyles.bold, active && {color: colors.white}]}>
                    {name}
                </Text>
                <View style={[styles.priceWrapper]}>
                    <Text style={[styles.price, constStyles.bold, active && {color: colors.white}]}>
                        {minPrice}
                    </Text>
                    <Text style={[styles.currency, constStyles.light, active && {color: colors.white}]}>
                        {' '}
                        сум
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    plane: {
        borderRadius: 15,
        marginBottom: 10,
        overflow: 'hidden',
    },
    container: {
        paddingHorizontal: 7,
        paddingLeft: 40,
        paddingVertical: 5,
        backgroundColor: colors.paleGray,
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 14,
    },
    priceWrapper: {
        flexDirection: 'row',
    },
    price: {
        fontSize: 14,
    },
    currency: {fontSize: 14},
});

export default TariffCard;
