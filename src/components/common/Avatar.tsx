import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from '../../assets/icons';
import colors from '../../constants/colors';
import constStyles from '../../constants/constStyles';
import ImagePicker from 'react-native-image-picker';

interface AvatarProps {
    setAvatar: (avatar: any) => void,
    avatar: object;
    style?: any;
    handleSubmit: any;
    initial: string;
}

const Avatar = ({avatar, setAvatar, style, handleSubmit, initial}: AvatarProps) => {
    const onAddPress = () => {
        const options = {};
        ImagePicker.launchImageLibrary({noData: true}, (response) => {
            console.log(response)
            if (response.uri) {
                setAvatar(response);
                Alert.alert(
                    'Сохранить',
                    'Вы дествительно хотите изменит фото профиля?',
                    [
                        {text: 'Да', onPress: ()  => handleSubmit(response)},
                        {text: 'Нет', onPress: () => setAvatar(initial)}
                    ]
                )
            }
        });
    };
    return (
        <TouchableOpacity onPress={onAddPress} style={[styles.container, style]}>
            <View style={styles.imageWrapper}>
                <Image source={{uri: avatar.uri || avatar}} style={styles.image}/>
            </View>
            <View style={[styles.iconWrapper, constStyles.shadow]}>
                <Icon name="plus" size={10} color={colors.darkGray}/>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    imageWrapper: {
        borderColor: colors.darkTransparent,
        borderWidth: 5,
        borderRadius: 190,
        width: 70,
        height: 70,
        overflow: 'hidden',
    },
    image: {
        height: 60,
        width: 60,
        resizeMode: 'cover',
    },
    iconWrapper: {
        position: 'absolute',
        top: 45,
        right: 0,
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 20,
    },
});

export default Avatar;
