import React from 'react';
import {Text, View} from 'react-native';
import Icon from '@assets/icons';
import colors from '@constants/colors';
import constStyles from '@constants/constStyles';
import TouchablePlatformSpecific from "@components/common/TouchablePlatformSpecific";
import styles from "./styles";
import MapHeader from "@components/navigation/MapHeader";
import OrderStatus from "@constants/orderStatus";

interface InnerHeaderProps {
    topTitle: any;
    topData: string;
    bottomTitle: any;
    bottomData: string;
    number: string;
    cancelOrder: () => void;
    orderStatus: string;
    headerTitle?: string,
    headerStyles?: any,

}

const TripHeader = (
    {
        headerTitle,
        topData,
        topTitle,
        bottomData,
        bottomTitle,
        cancelOrder,
        orderStatus,
        headerStyles
    }: InnerHeaderProps
) => {
    const renderInnerHeader = () => {
        switch (orderStatus) {
            case OrderStatus.DONE:
            case OrderStatus.RATING:
            case OrderStatus.WAITING:
            case OrderStatus.PROCESSING:
                return <></>;
            default:
                return (
                    <View style={styles.container}>
                        {
                            orderStatus !== OrderStatus.ACCEPTED &&
                            <View style={styles.dataWrapper}>
                                <View style={styles.topWrapper}>
                                    <Text style={[styles.topText, constStyles.bold, headerStyles]}>{topTitle}</Text>
                                    <Text style={[styles.topText, constStyles.bold, headerStyles]}>{' '}{topData}</Text>
                                </View>
                                <View style={styles.bottomWrapper}>
                                    <Text style={[styles.bottomText, constStyles.bold]}>{bottomTitle}:</Text>
                                    <Text style={[styles.bottomText, constStyles.bold]}>{' '}{bottomData}</Text>
                                </View>
                            </View>
                        }
                        {
                            orderStatus !== OrderStatus.ARRIVED &&
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flex: 1
                                }}
                            >
                                <Text style={{fontSize: 17}}>Отменить заказ</Text>
                                <View style={[styles.iconWrapper, constStyles.shadow]}>
                                    <TouchablePlatformSpecific onPress={cancelOrder}>
                                        <View style={styles.icon}>
                                            <Icon name="phone" color={colors.white} size={20}/>
                                        </View>
                                    </TouchablePlatformSpecific>
                                </View>
                            </View>
                        }
                    </View>
                )
        }
    };

    return (
        (orderStatus !== OrderStatus.PROCESSING && orderStatus !== OrderStatus.WAITING)
            ? <MapHeader title={headerTitle}>
                {renderInnerHeader()}
            </MapHeader>
            : null
    );
};


export default TripHeader;
