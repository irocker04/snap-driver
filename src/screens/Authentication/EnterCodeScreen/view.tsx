import React from 'react';
import {View, Text, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {CodeField,} from 'react-native-confirmation-code-field';

import constStyle from '@constants/constStyles';
import colors from '@constants/colors';
import strings from '@constants/strings';
import styles from "./styles";
import Button from "@components/common/Button";
import AuthHeader from "@components/navigation/AuthHeader";


interface IProps {
    handleSubmit: () => void;
    resend: () => void;
    codeFieldProps: any;
    getCellOnLayoutHandler: (index: number) => any;
    codeFieldRef: any;
    codeFieldValue: string;
    setCodeFieldValue: (code: string) => void;
    counter: number;
    error: boolean;
    isLoading: boolean;
    isButtonDisabled: boolean;
}

const EnterCodeView = (
    {
        handleSubmit,
        codeFieldProps,
        codeFieldRef,
        codeFieldValue,
        getCellOnLayoutHandler,
        setCodeFieldValue,
        counter,
        resend,
        error,
        isLoading,
        isButtonDisabled,
    }: IProps) => {
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                style={{backgroundColor: colors.white, flex: 1}}
                contentContainerStyle={{justifyContent: 'space-between'}}
                behavior={"position"}
            >
                <AuthHeader/>
                <View style={styles.titleWrapper}>
                    <Text style={[constStyle.semibold, styles.firstTitle]}>
                        {strings.newUser}
                    </Text>
                    <Text style={[constStyle.bold, styles.secondTitle]}>
                        {strings.enterCode}
                    </Text>
                </View>
                <View style={styles.cardWrapper}>
                    <CodeField
                        {...codeFieldProps}
                        ref={codeFieldRef}
                        rootStyle={styles.root}
                        value={codeFieldValue}
                        onChangeText={(text) => setCodeFieldValue(text)}
                        cellCount={5}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({index, symbol, isFocused}) => (
                            <Text
                                key={index}
                                style={[styles.cell, isFocused && styles.focusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol}
                            </Text>
                        )}
                    />
                    {
                        error &&
                        <View style={styles.errorMsg}>
                            <Text style={styles.errorMsgText}>Неверный код подтверждения</Text>
                        </View>
                    }
                </View>
                <View style={styles.counter}>
                    {
                        counter
                            ? <View style={styles.bottom}>
                                <Text style={styles.confirm}>Запросить новый код через</Text>
                                <Text style={styles.time}>&nbsp;&nbsp;{counter} сек</Text>
                            </View>
                            : <TouchableOpacity onPress={resend}>
                                <Text style={styles.confirm}>Запросить новый код</Text>
                            </TouchableOpacity>
                    }
                </View>
            </KeyboardAvoidingView>
            <View style={styles.submitButton}>
                <Button
                    disabled={isButtonDisabled}
                    isLoading={isLoading}
                    text={strings.send}
                    onPress={handleSubmit}
                />
            </View>
        </View>
    );
};


export default EnterCodeView;
