import {StyleSheet} from "react-native";
import Colors from "@constants/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 2,
    },
    item: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: Colors.paleGray
    },
    chatIcon: {
        width: 60,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 100,
        marginBottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    }
});
