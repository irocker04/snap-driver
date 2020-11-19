import {StyleSheet} from "react-native";
import colors from "@constants/colors";
import constStyles from "@constants/constStyles";

export default StyleSheet.create({
    container: {
        backgroundColor: colors.grey,
        flex: 1,
    },
    wrapper: {
        backgroundColor: colors.grey,
        padding: 15,
        paddingBottom: 20,
        borderColor: colors.white,
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
    bottomWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        paddingBottom: 20,
        backgroundColor: colors.grey,
        marginBottom: 40,
    },
    bottomIconWrapper: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        overflow: 'hidden',
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
        height: 20,
        width: 14,
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
    imgWrapper: {
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    infoWrapper: {
        paddingLeft: 10
    },
    rate: {
        ...constStyles.semibold,
        fontSize: 20,
        marginTop: 20,
    },
    price: {
        ...constStyles.bold,
        fontSize: 35,
        color: colors.blue
    },
    infoText: {
        fontSize: 16
    },
    textColor: {
        color: '#aaaeb7',
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
        borderColor: colors.paleGray,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        marginBottom: 20,
    },
    waiting: {
        marginHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    waitingText: {
        fontSize: 18
    }
})
