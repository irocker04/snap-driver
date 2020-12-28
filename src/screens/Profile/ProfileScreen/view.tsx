import React, {useEffect} from 'react';
import {
    View,
    ScrollView,
    FlatList,
    StatusBar,
} from 'react-native';
import {CONTAINER_PADDING} from '@constants/values';
import Avatar from '@components/common/Avatar';
import InputCard from '@components/cards/InputCard';
import strings from '@constants/strings';
import SelectAndInputCard from '@components/cards/SelectAndInputCard';
import SelectOrInputCard from '@components/cards/SelectOrInputCard';
import Button from '@components/common/Button';
import colors from '@constants/colors';
import images from '@assets/images';
import ImageCard from '@components/cards/ImageCard';
import styles from "./styles";

interface ProfileProps {
}

const ProfileScreenView = ({}: ProfileProps) => {

    const onPress = () => {
        // navigation.navigate('View');
    };

    let codeList = [
        {label: '90', value: '(90)'},
        {label: '91', value: '(91)'},
        {label: '93', value: '(93)'},
        {label: '94', value: '(94)'},
        {label: '97', value: '(97)'},
        {label: '98', value: '(98)'},
        {label: '99', value: '(99)'},
    ];

    const dummyUser = {
        name: 'Kamronbek',
        surname: 'Juraev',
        numberCode: '(94)',
        number: '454 58 86',
        carMark: 'Nissan',
        carModel: 'Qashqai',
        carNumber: '01 С 565 НН',
        passport: images.user,
        lisence: images.poster,
        password: '12345678',
        address: 'Navoiy kochasi 20',
    };

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: CONTAINER_PADDING,
                    justifyContent: 'space-between',
                }}>
                <View style={styles.profileWrapper}>
                    <Avatar style={styles.avatar}/>
                    <View style={styles.verticalWrapper}>
                        <InputCard
                            preValue={dummyUser.name}
                            title={strings.name || ''}
                            placeholder={strings.enterYourName || ''}
                        />
                        <InputCard
                            preValue={dummyUser.surname}
                            title={strings.familyName || ''}
                            placeholder={strings.enterYourFamilyName || ''}
                        />
                    </View>
                </View>
                <SelectAndInputCard
                    selectOptions={codeList}
                    titleVisible={true}
                    icon="smartphone"
                    selectValue="+998"
                    placeholder={strings.enterYourNumber || ''}
                    isInputNumber
                    title={strings.enterYourNumber || ''}
                    preValue={dummyUser.number}
                    selectedOption={dummyUser.numberCode}
                />
                <SelectOrInputCard
                    icon="listPen"
                    title={strings.yourResidence || ''}
                    placeholder={strings.addressResidence || ''}
                    preValue={dummyUser.address}
                />
                <SelectOrInputCard
                    isPassword
                    icon="passwordChecked"
                    preValue={dummyUser.password}
                    title={strings.changePassword || ''}
                    placeholder={strings.enterYourPassword || ''}
                />
                <View style={styles.carInfoWrapper}></View>
                <FlatList
                    columnWrapperStyle={styles.imagesWrapper}
                    numColumns={2}
                    data={[
                        {title: strings.passport, photo: dummyUser.passport},
                        {title: strings.license, photo: dummyUser.lisence},
                    ]}
                    renderItem={({item}) => <ImageCard item={item}/>}
                    keyExtractor={(item, index) => index.toString()}
                />
            </ScrollView>
            {/* <View style={styles.footer}> */}
            {/*  */}
            <View style={styles.buttonWrapper}>
                <Button
                    onPress={onPress}
                    text={strings.save}
                />
            </View>
            {/* </View> */}
        </View>
    );
};


export default ProfileScreenView;
