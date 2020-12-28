import {StyleSheet} from "react-native";
import {RFPercentage, RFValue} from "react-native-responsive-fontsize";
import colors from "@constants/colors";
import {CONTAINER_PADDING} from "@constants/values";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: CONTAINER_PADDING,
    },
    profile: {
        paddingTop: 10,
    },
    avatarWithText: {
        paddingVertical: 10,
        borderBottomColor: colors.superPaleGray,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    avatarWrapper: {
        height: 70,
        width: 70,
        overflow: 'hidden',
        borderRadius: 150,
        borderWidth: 1,
        borderColor: colors.paleGray,
    },
    avatar: {
        width: 70,
        height: 70,
        resizeMode: 'contain',
    },
    nameWrapper: {
        paddingLeft: 20,
    },
    name: {
        fontSize: 15,
    },
    number: {
        fontSize: RFValue(18, 812),
    },
    earningWrapper: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.superPaleGray,
    },
    summWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summTitle: {
        fontSize: 14,
    },
    summCurrency: {
        fontSize: 18,
        color: colors.blue,
    },
    summNumber: {
        fontSize: 18,
        color: colors.blue,
    },
    activity: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    iconWithText: {
        alignItems: 'center',
    },
    iconWrapper: {
        marginBottom: 10,
        borderRadius: 30,
        backgroundColor: colors.white,
        height: 45,
        justifyContent: 'center',
        width: 45,
        alignItems: 'center',
    },
    percentage: {
        fontSize: RFValue(18, 812)
    },
    activityName: {
        fontSize: RFValue(14, 812),
    },
    menuList: {
        marginTop: 10,
    },
    logoutWrapper: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
