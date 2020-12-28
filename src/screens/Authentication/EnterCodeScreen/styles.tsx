import {StyleSheet} from "react-native";
import colors from "@constants/colors";
import {BUTTON_MARGIN_BOTTOM, CONTAINER_PADDING, deviceWidth} from "@constants/values";
import {constStyles} from "@constants/index";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    titleWrapper: {
        padding: 18,
        paddingTop: 30,
        justifyContent: 'center',
    },
    firstTitle: {
        fontSize: 14,
    },
    secondTitle: {
        fontSize: 20,
    },
    cardWrapper: {
        padding: CONTAINER_PADDING,
    },
    submitButton: {
        paddingHorizontal: CONTAINER_PADDING,
        marginBottom: BUTTON_MARGIN_BOTTOM,
    },
    root: {
        justifyContent: 'center'
    },
    cell: {
        width: (deviceWidth / 5) - 15,
        height: 40,
        lineHeight: 38,
        fontSize: 24,
        marginHorizontal: 5,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: colors.grey,
        textAlign: 'center',
        elevation: 15,
        backgroundColor: colors.white
    },
    focusCell: {
        borderColor: colors.blue,
    },
    bottom: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 50,
    },
    confirm: {
        color: '#858585',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    time: {
        fontSize: 14,
        textAlign: 'center',
        color: colors.blue,
        fontWeight: 'bold'
    },
    counter: {
        marginTop: 20,
        alignItems: 'center',
    },
    errorMsg: {
        position: 'absolute',
        flex: 1,
        bottom: -20,
        left: 0,
        right: 0
    },
    errorMsgText: {
        textAlign: 'center',
        color: 'red',
        ...constStyles.semibold,
    }
});
