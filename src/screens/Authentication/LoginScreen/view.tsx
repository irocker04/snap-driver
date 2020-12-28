import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import constStyle from '@constants/constStyles';
import colors from '@constants/colors';
import strings from '@constants/strings';
import styles from './styles';
import Icon from '@assets/icons';
import Button from '@components/common/Button';
import AuthHeader from '@components/navigation/AuthHeader';

interface IProps {
  handleSubmit: () => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  isLoading: boolean;
  isButtonDisabled: boolean;
}

const LoginScreenView = ({
  handleSubmit,
  phoneNumber,
  setPhoneNumber,
  isLoading,
  isButtonDisabled,
}: IProps) => {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={'position'} >
      <View style={styles.container}>
        <AuthHeader />
        <View style={styles.titleWrapper}>
          <Text style={[constStyle.semibold, styles.firstTitle]}>
            {strings.weAreHappyYouAreHere}
          </Text>
          <Text style={[constStyle.bold, styles.secondTitle]}>
            {strings.letsRegister}
          </Text>
        </View>
        <View style={styles.cardWrapper}>
          <View style={styles.input}>
            <Icon name={'smartphone'} size={28} />
            <Text style={styles.prefix}>+998</Text>
            <TextInputMask
              keyboardType={'number-pad'}
              placeholder={strings.enterYourNumber}
              style={styles.mask}
              type={'custom'}
              options={{
                mask: '99 999 99 99',
              }}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
          </View>
        </View>
        <View style={styles.footerWrapper}>
          <Text style={[constStyle.medium, styles.firstFooter]}>
            {strings.privacyPoliceFirst}
          </Text>
          <Text style={[constStyle.bold, styles.secondFooter]}>
            {strings.privacyPoliceSecond}
          </Text>
        </View>
        <View style={styles.submitButton}>
          <Button
            text={strings.send}
            onPress={handleSubmit}
            isLoading={isLoading}
            disabled={isButtonDisabled}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreenView;
