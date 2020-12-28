import {StyleSheet} from "react-native";
import colors from "@constants/colors";
import {constStyles} from "@constants/index";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grey,
    },
    messageItem: {
        marginTop: 5,
        marginHorizontal: 15,
        marginBottom: 15,
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 15,
        elevation: 10
    },
    messageTitle: {
        ...constStyles.bold,
        fontSize: 15
    },
    messageText: {
        paddingVertical: 5
    },
});
