import {StyleSheet} from "react-native";
import colors from "@constants/colors";
import constStyles from "@constants/constStyles";

export default StyleSheet.create({
    hatCutOut: {
        width: '100%',
        height: 15,
    },
    wrapper: {
        backgroundColor: colors.grey,
        padding: 15,
        paddingBottom: 20,
        borderWidth: 2,
        borderColor: colors.white,
        borderTopWidth: 0,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
    },
    innerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: colors.superPaleGray,
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    text: {
        ...constStyles.bold,
        fontSize: 15
    },
    selectNavigatorText: {
        color: colors.black,
        fontSize: 18,
        ...constStyles.light
    },
    icon: {
        backgroundColor: colors.white,
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconWrapper: {
        ...constStyles.shadow,
        borderRadius: 30,
        overflow: 'hidden',
    },
    locationIconWrapper: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        height: 20,
        width: 14,
        resizeMode: 'contain'
    },
    textWrapper: {
        paddingLeft: 10,
    },
    drivingFrom: {
        fontSize: 14,
        ...constStyles.light,
    },
})
