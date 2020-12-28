import {StyleSheet} from "react-native";
import {BIG_BORDER_RADIUS, deviceHeight} from "@constants/values";
import colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        borderBottomRightRadius: BIG_BORDER_RADIUS,
        borderBottomLeftRadius: BIG_BORDER_RADIUS,
        overflow: 'hidden',
        backgroundColor: colors.blue
    },
    posterWrapper: {
        alignItems: 'center',
        paddingVertical: 20,
        height: deviceHeight * 0.4,
    },
    posterImage: {
        marginLeft: 20,
        width: 317,
        height: deviceHeight * 0.4,
        resizeMode: 'contain',
    },

});
