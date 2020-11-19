import React, {useState} from 'react';
import {View, Alert, StyleSheet, TextInput, Text, ScrollView, Dimensions} from 'react-native'
import Colors from "../constants/colors";
import Button from "../components/common/Button";
import api from "../services/api";

export const formData = (rawData: any) => {
    let form = new FormData();
    Object.keys(rawData).forEach(key => {
        form.append(key, rawData[key]);
    });
    return form;
};


const SupportCategoryScreen = () => {
    const Container = Dimensions.get('screen').height > 700 ? View : ScrollView;

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message) {
            api
                .request
                .post('/admin-messages', formData({message}))
                .then(() => {
                    Alert.alert('Успешно', 'Cообщение отправлено успешно ждите ответа службы поддерки.');
                    setMessage('');
                })
        }
    };

    return (
        <Container style={styles.container}>
            <View style={{paddingHorizontal: 20, flex: 1}}>
                <Text style={{fontSize: 16}}>Комментарий</Text>
                <View style={styles.textarea}>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        multiline={true}
                        placeholder={'Напишите ваш отзыв'}
                    />
                </View>
                {/*<TouchableWithoutFeedback>*/}
                {/*    <View>*/}
                {/*        <Regular style={{fontSize: 15, marginBottom: 10, color: Colors.grey}}>Прикрепите скрин</Regular>*/}
                {/*        <View style={styles.attachFile}>*/}
                {/*            <SemiBold style={{color: '#858585'}}>Загрузить</SemiBold>*/}
                {/*            <AttachFileIcon/>*/}
                {/*            <View style={styles.border}/>*/}
                {/*        </View>*/}
                {/*    </View>*/}
                {/*</TouchableWithoutFeedback>*/}
                <Button
                    onPress={sendMessage}
                    text={'отправить'}
                    containerStyle={{marginBottom: 33}}
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textarea: {
        paddingHorizontal: 10,
        borderRadius: 10,
        elevation: 10,
        backgroundColor: Colors.grey,
        height: 126,
        marginTop: 13,
        marginBottom: 40
    },
    attachFile: {
        height: 52,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 6,
        backgroundColor: Colors.grey,
        alignItems: 'center',
        paddingHorizontal: 17,
        borderRadius: 10,
        marginBottom: 50,
        borderBottomStartRadius: 0
    },
    border: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        height: 3,
        backgroundColor: Colors.blue,
        borderRadius: 10
    }
});

export default SupportCategoryScreen;
