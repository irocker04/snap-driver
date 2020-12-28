import React, {useState} from 'react';
import {Text, View, FlatList, Alert, Animated, ScrollView} from 'react-native';
import {connect, useDispatch, useSelector} from "react-redux";
import {TouchableOpacity} from 'react-native-gesture-handler';
import {bindActionCreators} from "redux";

import styles from "./styles";
import colors from '@constants/colors';
import constStyles from '@constants/constStyles';
import strings from '@constants/strings';
import Icon from '@assets/icons';
import DrawerItem from '../DrawerItem';
import {screens} from "../../../navigation/DraweNavigator/screens";
import Avatar from "@components/common/Avatar";
import user from "@store/actions/user";


const DrawerContent = (props: any) => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.user.data);
    const phoneNumber = user.phone;

    const logout = () => {
        Alert.alert('Выйти из аккаунта', 'Вы уверены что хотите выйти из аакунта?', [
            {text: 'Отмена'},
            {text: 'Выйти', onPress: () => dispatch({type: 'LOGOUT'})}
        ])
    };

    const [avatar, setAvatar] = useState(user.avatar);
    const [isLoading, setIsLoading] = useState(false);
    const [rotateVal, setRotateVal] = useState(new Animated.Value(0));
    const handleSubmit = (ava: any) => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('avatar', {
            uri: ava.uri,
            type: ava.type,
            name: ava.fileName,
        });
        props.UpdateProfile(formData, () => {
                setIsLoading(false);
            }, () => {
                setIsLoading(false);
            }
        )
    };

    const updateProfile = () => {
        rotate();
        props.GetProfile(null, () => {
                setIsLoading(false);
                rotateVal.setValue(0);
            }, () => {
                setIsLoading(false);
            }
        )
    }

    const rotate = () => {
        rotateVal.setValue(0);
        Animated.timing(rotateVal, {
            duration: 5000,
            toValue: 360,
            useNativeDriver: true,
        }).start()
    }

    return (
        <ScrollView style={{flex: 1}} >
            <View style={styles.container}>
                <View style={styles.profile}>
                    <View style={styles.avatarWithText}>
                        <Avatar
                            avatar={avatar}
                            setAvatar={setAvatar}
                            handleSubmit={handleSubmit}
                            initial={user.avatar}
                        />
                        <View style={styles.nameWrapper}>
                            <Text style={[styles.name, constStyles.medium]}>
                                ID: {user.user_id}
                            </Text>
                            <Text style={[styles.number, constStyles.bold]}>
                                +{phoneNumber.slice(0, 3)} {phoneNumber.slice(3, 5)} {phoneNumber.slice(5, 8)} {phoneNumber.slice(8, 10)} {phoneNumber.slice(10, 12)}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.earningWrapper}>
                        <View style={styles.summWrapper}>
                            <Text style={[styles.summTitle, constStyles.bold]}>
                                {strings.sum}
                                {': '}
                            </Text>
                            <Text style={[styles.summNumber, constStyles.bold]}>
                                {user.balance}{' '}
                            </Text>
                            <Text style={[styles.summCurrency, constStyles.light]}>
                                сум
                            </Text>
                        </View>
                        <Animated.View style={{transform: [{rotate: rotateVal}]}}>
                            <TouchableOpacity onPress={updateProfile}>
                                <Icon
                                    name="curveDown"
                                    size={9}
                                    color={colors.blue}
                                    style={{paddingBottom: 3}}
                                />
                                <Icon name="curveUp" size={9}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
                <View style={styles.activity}>
                    <View style={styles.iconWithText}>
                        <View style={[styles.iconWrapper, constStyles.shadow]}>
                            <Icon name="tick" color={colors.blue} size={15}/>
                        </View>
                        <Text style={[styles.percentage, constStyles.bold]}>
                            0%
                        </Text>
                        <Text style={[styles.activityName, constStyles.light]}>
                            {strings.activeness}
                        </Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <View style={[styles.iconWrapper, constStyles.shadow]}>
                            <Icon name="star" color={colors.blue} size={20}/>
                        </View>
                        <Text style={[styles.percentage, constStyles.bold]}>
                            0
                        </Text>
                        <Text style={[styles.activityName, constStyles.light]}>
                            {strings.rate}
                        </Text>
                    </View>
                    <View style={styles.iconWithText}>
                        <View style={[styles.iconWrapper, constStyles.shadow]}>
                            <Icon name="multiply" color={colors.blue} size={30}/>
                        </View>
                        <Text style={[styles.percentage, constStyles.bold]}>
                            0%
                        </Text>
                        <Text style={[styles.activityName, constStyles.light]}>
                            {strings.cancels}
                        </Text>
                    </View>
                </View>
                <View style={styles.menuList}>
                    <FlatList
                        data={screens}
                        renderItem={({item}) => (
                            item.label &&
                            <DrawerItem
                                item={item}
                                {...props}
                            />
                        )}
                        keyExtractor={(item) => item.name}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
    GetProfile: user.GetProfile,
    UpdateProfile: user.UpdateProfile,
}, dispatch);


export default connect(
    null,
    mapDispatchToProps
)(DrawerContent);

