
import React, { useContext, useState } from 'react';
 import {
   View,
   Image,
   Text,
   ScrollView,
 } from 'react-native';
import GeneralContext from '../../common/GeneralContext';
import * as Constants from '../../utils/Constants'
import { validateUser } from '../../services/UserService';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import addContactStyle from './AddContactStyles' 
import { Button, Snackbar, TextInput } from 'react-native-paper';

const AddContactScreen = () => {

    const snackBarInitialState = {
        visible: false,
        message: Constants.EMPTY_STRING,
    }

    const generalContext = useContext(GeneralContext);

    const [userId, setUserId] = useState(Constants.EMPTY_STRING);
    const [nickName, setNickname] = useState(Constants.EMPTY_STRING);
    const [snackBar, setSnackBar] = useState(snackBarInitialState);
    const [userIdError, setUserIdError] = useState(Constants.EMPTY_STRING);
    const [nicknameError, setNicknameError] = useState(Constants.EMPTY_STRING);


    const clearValues = () => {
        setNicknameError(Constants.EMPTY_STRING);
        setUserIdError(Constants.EMPTY_STRING);
        setUserId(Constants.EMPTY_STRING);
        setNickname(Constants.EMPTY_STRING);
    }

    const validateUserId = () => {
        let isValid = true;
        if (userId.trim().length <= 0 || userId.toLowerCase() === generalContext.sendbird.currentUser.userId) {
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


    const addUser = () => {
      if (validateUserId() & validateNickname()) {
        validateUser(userId.toLowerCase()).then((res) => {
          /* User exists */
          if (res.status === Constants.OK){
            createChannel();
          }
        }).catch((err) => {
          console.log(err);
            /* User doesn't exist */
            if (err.response.status === Constants.BAD_REQUEST){
              setSnackBar({ visible: true, message: "User doesn't exist!" })
              clearValues();
            }
        });
      }
    }

    const createChannel = () => {
        var userIds = [generalContext.sendbird.currentUser.userId, userId.toLowerCase()];

        generalContext.sendbird.GroupChannel.createChannelWithUserIds(userIds, true, nickName, null, null, null, function(groupChannel, error) {
            if (error) {
              setSnackBar({ visible: true, message: "There was a problem, try later!" });
            }
            setSnackBar({ visible: true, message: "User was registered!" });
        });
        clearValues();
    }

   return (
    <KeyboardAvoidingView behavior={Platform.OS === Constants.IOS ? 'padding' : Constants.EMPTY_STRING} style={addContactStyle.container}>
        <ScrollView>
            <View style={addContactStyle.innerContainer}>
                <Image source={require('./../../../assets/add-user.png')} style={[ addContactStyle.registerImage ]}/>
                <Text style={[addContactStyle.textLabel]}>
                    UserId
                </Text>
                <TextInput
                    activeUnderlineColor={"#458f59"}
                    placeholder="Type the userId"
                    onChangeText={(value) => setUserId(value)}
                    value={userId}
                />
                <Text style={[addContactStyle.errorLabel]}>{userIdError}</Text>
                <Text style={[addContactStyle.textLabel]}>
                    Nickname
                </Text>
                <TextInput
                    activeUnderlineColor={"#458f59"}
                    placeholder="Type the Nickname"
                    onChangeText={(value) => setNickname(value)}
                    value={nickName}
                />
                <Text style={[addContactStyle.errorLabel]}>{nicknameError}</Text>
                <View style={addContactStyle.registerButton}>
                    <Button color={"#458f59"} mode="contained" onPress={() => addUser()}>
                        ADD CONTACT
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

 export default AddContactScreen;