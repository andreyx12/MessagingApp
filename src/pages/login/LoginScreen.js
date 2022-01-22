
import React, { useState, useContext } from 'react';
 import {
   Text,
   View,
   Platform,
 } from 'react-native';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import GeneralContext from '../../common/GeneralContext';
import { validateUser } from '../../services/UserService';
import * as Constants from '../../utils/Constants'
import LoginStyles from '../login/LoginStyles'
import { Snackbar, TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
 
const LoginScreen = ({ navigation }) => {

  const generalContext = useContext(GeneralContext);
  const [userId, setUserId] = useState(Constants.EMPTY_STRING);
  const [error, setError] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState({ visible: false, message: Constants.EMPTY_STRING });

  const connect = () => {
      generalContext.sendbird.connect(userId.toLowerCase(), (user, err) => {
          if (!err) {
            redirectToChat();
          } else {
            setSnackBarMessage({visible: true, message: "Login failed, try again later!"});
          }
      });
    };

  const validateUserAndConnect = () => {
      validateUser(userId.toLowerCase()).then((res) => {
        /* User exists */
        if (res.status === Constants.OK){
          connect();
        }
      }).catch((err) => {
          /* User doesn't exist */
          if (err.response.status === Constants.BAD_REQUEST){
            setError(true);
          }
      });
  }

  const redirectToChat = () => {
      navigation.reset({
          index: 0,
          routes: [{ name: Constants.CHAT_SCREEN }],
      });
  };

  const onPress = () => {
      if (userId.trim().length > 0) {
        validateUserAndConnect();
      } else {
        setError(true);
      }
  }

  const ErrorMessage = () => {
    if (error) {
      return  <Text style={[LoginStyles.errorLabel]}>Invalid userId, try again!</Text>
    } else {
      return <Text/>
    }
  };

  return (
     <KeyboardAvoidingView behavior={Platform.OS === Constants.IOS ? 'padding' : Constants.EMPTY_STRING} style={LoginStyles.container}>
        <View elevation={10} style={LoginStyles.contentContainer}>
          <View style={LoginStyles.innerContainer}>
            <Text style={[LoginStyles.title]}>
              Chat
            </Text>
            <Text style={[LoginStyles.textLabel]}>
              UserId
            </Text>
            <TextInput
                activeUnderlineColor={"#458f59"}
                placeholder="Type your UserId"
                onChangeText={(value) => setUserId(value)}
                value={userId}
            />
            <ErrorMessage/>
            <View style={LoginStyles.enterButton}>
              <Button color={"#458f59"} mode="contained" onPress={onPress}>
                  LOG IN
              </Button>
            </View>
            <View style={LoginStyles.registerButton}>
              <Button color={"#458f59"} mode="contained" onPress={() => navigation.navigate(Constants.USER_REGISTRATION_SCREEN)}>
                  Sign up
              </Button>
              </View>
          </View>
        </View>
        <Snackbar visible={snackBarMessage.visible} duration={5000}>
          {snackBarMessage.message}
      </Snackbar>
     </KeyboardAvoidingView>
   );
 };
 
 export default LoginScreen;
 