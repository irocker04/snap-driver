import React from 'react';
import {View, FlatList, Text} from 'react-native';
import styles from "./styles";


const NotificationsScreenView = ({notifications}: any) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={notifications}
                renderItem={({item}) => (
                    <View style={styles.messageItem}>
                        <Text style={styles.messageTitle}>{item.title}</Text>
                        <Text style={styles.messageText}>{item.message}</Text>
                        <Text style={{textAlign: 'right', fontSize: 10}}>{item.created_at}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default NotificationsScreenView;
