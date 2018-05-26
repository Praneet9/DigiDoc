import React from 'react';
import {View, Text, TextInput} from 'react-native';


const InputField = ({label,emailError,signinError, fnameError, otherError, lnameError, qualificationError,
                        specializationError, validationError,passwordError,confirmError, onChangeText,
                        keyboardType, autoCapitalize, onSubmitEditing, returnKeyType, secureTextEntry, children}) => {

    return (

        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style = {styles.Label}>
                    {label}
                </Text>
            </View>

            <TextInput
                style = {{marginTop: 0, paddingTop: 0}}
                secureTextEntry = {secureTextEntry}
                onChangeText = {onChangeText}
                underlineColorAndroid= { signinError === "" || otherError === "" || fnameError === "" || lnameError === "" || qualificationError === "" || specializationError === "" || emailError===""||passwordError===""||confirmError===""? "#eee":"#ff0000" }
                onSubmitEditing={onSubmitEditing}
                returnKeyType = {returnKeyType}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
            />
            <Text style = {styles.Error}>
                {emailError}{passwordError}{confirmError}{fnameError}{lnameError}{qualificationError}{specializationError}
            </Text>
        </View>

    );

};

export default InputField;

const styles = {
    Label: {
        margin: 0,
        paddingLeft: 3,
        color: "#bdbdbd",
        fontSize: 12,
    },
    Error: {
        color: "#ff0000",
            paddingRight: 3,
            fontSize: 13,
            paddingBottom: 3,
            textAlign: "right"
    }
};
//
