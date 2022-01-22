import React, { useState } from 'react';
import {
   Text,
   View,
   Image,
 } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { createUser } from '../../services/UserService';
import * as Constants from '../../utils/Constants'
import userRegistrationStyles from '../login/UserRegistrationStyles'

import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
 
const UserRgistrationScreen = ({ navigation }) => {

    const snackBarInitialState = {
        visible: false,
        message: Constants.EMPTY_STRING,
    }

    const [userId, setUserId] = useState(Constants.EMPTY_STRING);
    const [nickName, setNickName] = useState(Constants.EMPTY_STRING);
    const [snackBar, setSnackBar] = useState(snackBarInitialState);
    const [userIdError, setUserIdError] = useState(Constants.EMPTY_STRING);
    const [nicknameError, setNicknameError] = useState(Constants.EMPTY_STRING);


    const clearValues = () => {
        setNicknameError(Constants.EMPTY_STRING);
        setUserIdError(Constants.EMPTY_STRING);
        setUserId(Constants.EMPTY_STRING);
        setNickName(Constants.EMPTY_STRING);
    }

    const validateUserId = () => {
        let isValid = true;
        if (userId.trim().length <= 0) {
            isValid = false;
            setUserIdError("UserId is not valid!");
        }
        return isValid;
    }

    const validateNickname = () => {
        let isValid = true;
        if (nickName.trim().length <= 0) {
            isValid = false;
            setNicknameError("Nickname is not valid!");
        }
        return isValid;
    }

    const onPress = () => {
        if (validateUserId() & validateNickname()) {
            createUser({
                "user_id": userId.toLowerCase(),
                "nickname": nickName,
                "profile_url": Constants.EMPTY_STRING
            })
            .then((res) => {
                processResult(res.status);
            })
            .catch((err) => {
                processResult(err.response.status);
            });
        }
    }

    const processResult = (httpStatus) => {
        switch(httpStatus) {
            case Constants.OK: 
                handleResponse(true, "User was created!");
                return;
            case Constants.BAD_REQUEST:
                handleResponse(true, "User already exists, try again!");
                clearValues();
                return;
            default:
                handleResponse(true, "There was a problem, try later!");
        }
    }

    const handleResponse = (state, message) => {
        setSnackBar({
            ...snackBar,
            visible: state,
            message: message
        });
        clearValues();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === Constants.IOS ? 'padding' : Constants.EMPTY_STRING} style={userRegistrationStyles.container}>
            <ScrollView>
                <View style={userRegistrationStyles.innerContainer}>
                <Image source={require('./../../../assets/user.png')} style={[ userRegistrationStyles.registerImage ]}/>
                <Text style={[userRegistrationStyles.textLabel]}>
                    UserId
                </Text>
                <TextInput
                    activeUnderlineColor={"#458f59"}
                    placeholder="Type your userId"
                    onChangeText={(value) => setUserId(value)}
                    value={userId}
                />
                <Text style={[userRegistrationStyles.errorLabel]}>{userIdError}</Text>
                <Text style={[userRegistrationStyles.textLabel]}>
                    Nickname
                </Text>
                <TextInput
                    activeUnderlineColor={"#458f59"}
                    placeholder="Type your Nickname"
                    onChangeText={(value) => setNickName(value)}
                    value={nickName}
                />
                <Text style={[userRegistrationStyles.errorLabel]}>{nicknameError}</Text>
                <View style={userRegistrationStyles.registerButton}>
                    <Button color={"#458f59"} mode="contained" onPress={() => onPress()}>
                        Sign up
                    </Button>
                </View>
                </View>
                <Snackbar
                    visible={true}
                    onDismiss={()=> setSnackBar({...snackBar, visible: false})}
                    visible={snackBar.visible}
                    duration={10000}
                    action={{
                        label: 'Close',
                    }}>
                    {snackBar.message}
                </Snackbar>
            </ScrollView>
        </KeyboardAvoidingView>
    );
 };
 
 export default UserRgistrationScreen;