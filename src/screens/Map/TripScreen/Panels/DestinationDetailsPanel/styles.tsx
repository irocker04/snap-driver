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
        paddingTop: 10,
        padding: 20,
        flexDirection: 'row',
        backgroundColor: colors.grey,
    },
    text: {
        ...constStyles.bold,
        fontSize: 15
    },
    drivingText: {
        fontSize: 14,
        ...constStyles.light,
    },
    dragIcon: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.grayText,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
        width: 30,
    },
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        paddingBottom: 20,
        backgroundColor: colors.grey,
    },
    bottomIconWrapper: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        // overflow: 'hidden',
        ...constStyles.shadow,
    },
    optionsWrapper: {
        paddingHorizontal: 15,
        backgroundColor: colors.grey,
    },
    optionWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    img: {
        width: 14,
        height: 60,
        resizeMode: 'contain',
    },
    drivingFromWrapper: {
        marginLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.superPaleGray,
    },
    drivingToWrapper: {
        paddingLeft: 10,
        paddingTop: 5,
    },
    optionText: {
        ...constStyles.bold,
        fontSize: 15,
        marginRight: 'auto',
        marginLeft: 11.5
    },
    directionText: {
        fontSize: 16,
    },
    circle: {
        width: 8,
        height: 8,
        backgroundColor: colors.blue,
        borderRadius: 100
    },
    addressCircle: {
        width: 15,
        height: 15,
        backgroundColor: colors.blue,
        borderRadius: 100,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 8,
        height: 8,
        backgroundColor: '#fff',
        borderRadius: 100,
    },
    icons: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 3
    },
    smallCircle: {
        width: 3,
        height: 3,
        backgroundColor: '#B6C5EE',
        borderRadius: 100
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
    },
    direction: {
        marginHorizontal: 20,
        marginBottom: 20,
    },
    dot: {
        position: 'absolute',
        width: 20,
        height: 20,
        backgroundColor: colors.red,
        top: -5,
        right: 1,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotText: {
        color: colors.white,
        fontSize: 11,
        ...constStyles.semibold
    }
})
