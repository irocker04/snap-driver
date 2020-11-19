import React from 'react';
import {View, Text, TouchableWithoutFeedback, Linking, TouchableOpacity, Image} from 'react-native'

import styles from "./styles";
import ArrowIcon from "@assets/icons/ArrowIcon";
import ChatIcon from "@assets/icons/ChatIcon";


const SupportScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
            <View style={{marginHorizontal: 20}}>
                <View>
                    <Text>Контакты</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30}}>
                        <Text>Служба поодержки:</Text>
                        <TouchableOpacity onPress={() => Linking.openURL('tel:+998555022525')}>
                            <Text>+998 55 502 25 25</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row-reverse', flexWrap: 'wrap', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => navigation.navigate('SupportChat')}>
                        <View style={styles.chatIcon}>
                            <ChatIcon/>
                        </View>
                    </TouchableOpacity>
                    <Text style={{flex: 1, marginRight: 30, fontSize: 12}}>
                        Для улучшения нашего сервиса. Отправьте ваше комментарии
                        или жалобу или пожелания в CALL- CENTR .
                        Для нас это очень важно.
                        Берегите себя и своих близких .
                    </Text>
                </View>
                <Image
                    source={require('../../assets/images/calls.jpg')}
                    resizeMode={'contain'}
                    style={{
                        width: '100%',
                        height: 300
                    }}
                />
            </View>
        </View>
    );
};

export default SupportScreen;
