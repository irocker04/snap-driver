import React, {useEffect} from 'react';
import {
    Text,
    View,
    ScrollView,
} from 'react-native';
import strings from '@constants/strings';
import HeaderTab from '@components/navigation/HeaderTab';
import BubleCutout from '@components/common/Buble';
import HatCutout from '@components/common/HatCutout';
import constStyles from '@constants/constStyles';
import {FlatList} from 'react-native-gesture-handler';
import styles from "./styles";


const EarningsScreenView = ({statistics, balance, changePeriod}: any) => {

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.tabWrapper}>
                <HeaderTab changePeriod={changePeriod}/>
            </View>
            <View style={styles.container}>
                <View style={[styles.topWrapper, constStyles.wideShadow]}>
                    <Text style={[styles.tabName, constStyles.bold]}>
                        {strings.inDay}
                    </Text>
                    <View style={styles.earningWrapper}>
                        <Text style={[styles.earningPrice, constStyles.bold]}>{statistics.price}</Text>
                        <Text style={[styles.earningCurrency, constStyles.medium]}>сум</Text>
                    </View>
                    <BubleCutout style={styles.buble}/>
                </View>
                <View style={[styles.bottomWrapper, constStyles.wideShadow]}>
                    <HatCutout style={styles.cut}/>
                    <FlatList
                        columnWrapperStyle={styles.barWrapper}
                        numColumns={2}
                        data={[
                            {
                                id: '0',
                                name: strings.ride,
                                data: statistics.bookings_canceled_count + statistics.bookings_done_count
                            },
                            {id: '1', name: strings.cancels, data: statistics.bookings_canceled_count},
                            {id: '2', name: strings.skipped, data: statistics.bookings_done_count},
                            {id: '3', name: strings.duration, data: statistics.time_spend_in_min},
                        ]}
                        renderItem={({item}) => (
                            <View style={styles.bar}>
                                <Text
                                    style={[
                                        styles.barTitle,
                                        constStyles.light,
                                    ]}>
                                    {item.name}:
                                </Text>
                                <Text
                                    style={[
                                        styles.barData,
                                        constStyles.bold,
                                    ]}>
                                    {item.data}
                                </Text>
                            </View>
                        )}
                    />
                </View>
                {/*<View style={[styles.card, constStyles.wideShadow]}>*/}
                {/*    <View style={[styles.row, styles.borderBottom]}>*/}
                {/*        <View style={styles.rowLeft}>*/}
                {/*            <Text*/}
                {/*                style={[styles.rowTitle, constStyles.bold]}>*/}
                {/*                {strings.balance}:{' '}*/}
                {/*            </Text>*/}
                {/*            <Text*/}
                {/*                style={[styles.rowPrice, constStyles.bold]}>*/}
                {/*                {balance}{' '}*/}
                {/*            </Text>*/}
                {/*            <Text*/}
                {/*                style={[*/}
                {/*                    styles.rowPrice,*/}
                {/*                    constStyles.light,*/}
                {/*                ]}>*/}
                {/*                сум*/}
                {/*            </Text>*/}
                {/*        </View>*/}
                {/*        <View>*/}
                {/*            <Icon*/}
                {/*                name="curveDown"*/}
                {/*                size={9}*/}
                {/*                color={colors.blue}*/}
                {/*                style={{paddingBottom: 3}}*/}
                {/*            />*/}
                {/*            <Icon name="curveUp" size={9}/>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</View>*/}
                {/*<ChooseCard/>*/}
            </View>
        </ScrollView>
    );
};

export default EarningsScreenView;
