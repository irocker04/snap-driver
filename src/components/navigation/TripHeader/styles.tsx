import {StyleSheet} from "react-native";
import {CONTAINER_PADDING} from "@constants/values";
import colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: CONTAINER_PADDING,
    },
    dataWrapper: {},
    topWrapper: {
        flexDirection: 'row',
    },
    bottomWrapper: {
        flexDirection: 'row',
    },
    topText: {
        color: colors.black,
        fontSize: 19,
    },
    bottomText: {
        color: colors.blue,
        fontSize: 17,
    },
    iconWrapper: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: colors.red,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
