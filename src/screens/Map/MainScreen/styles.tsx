import {StyleSheet} from "react-native";
import {BUTTON_MARGIN_BOTTOM, CONTAINER_PADDING} from "@constants/values";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: CONTAINER_PADDING,
        flex: 1,
        justifyContent: 'space-between',
    },
    messageWrapper: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        marginBottom: BUTTON_MARGIN_BOTTOM,
    },
    tariffWrapper: {
        position: 'absolute',
        left: -1000,
    },
    activeTariff: {
        left: -35
    },
    button: {
        height: 63,
        borderRadius: 250
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 18
    }
});
