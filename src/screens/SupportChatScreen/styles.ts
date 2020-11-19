import {StyleSheet} from "react-native";
import Colors from "@constants/colors";

export default StyleSheet.create({
    form: {
        borderWidth: 2,
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: 27,
        borderColor: '#fff',
        alignItems: 'center',
        paddingHorizontal: 15,
        elevation: 10,
        backgroundColor: Colors.grey,
        borderRadius: 15
    },
    chatArea: {
        marginTop: 20
    },
    driver: {
        width: '60%',
        borderRadius: 20,
        backgroundColor: '#EDF0F5',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderBottomStartRadius: 0,
    },
    client: {
        width: '60%',
        backgroundColor: Colors.blue,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        borderBottomEndRadius: 0
    },
    text: {
        color: '#fff',
        fontSize: 13,
        lineHeight: 20
    }
});
