import React, { useContext } from 'react';
import ConversationChatScreen from '../pages/Chat/ConversationChatScreen';
import ChatScreen from '../pages/Chat/ChatScreen';
import LoginScreen from '../pages/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GeneralContext from './GeneralContext';
import * as Constants from '../utils/Constants';
import ContactScreen from '../pages/Contact/ContactScreen';
import AddContactScreen from '../pages/Contact/AddContactScreen';
import { Button } from 'react-native-paper';
import UserRegistrationScreen from '../pages/login/UserRegistration';

const Stack = createStackNavigator();

export default function Navigator() {

  const generalContext = useContext(GeneralContext);

  const dologout = (navigation) => {
    generalContext.sendbird.disconnect(function() {});
    navigation.reset({index: 0,
        routes: [{ name: Constants.LOGIN_SCREEN }],
    });
  }

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen
              name={Constants.LOGIN_SCREEN}
              component={LoginScreen}
              options={ ( {_} ) => ({
                headerShown: false
              })}
            />
             <Stack.Screen
              options={{ title: 'Register User' }}
              name={Constants.USER_REGISTRATION_SCREEN}
              component={UserRegistrationScreen}
            />
            <Stack.Screen
              name={Constants.CHAT_SCREEN} 
              component={ChatScreen}
              options={ ( {navigation} ) => ({
                headerRight: () => (
                  <Button mode="text" color={"#458f59"} onPress={() => dologout(navigation)}>
                      {Constants.LOGOUT_SCREEN}
                  </Button>
                ),
                headerLeft: () => (
                  <Button mode="text" color={"#458f59"} onPress={() => navigation.navigate(Constants.CONTACT_SCREEN)}>
                      {Constants.CONTACT_SCREEN}
                  </Button>
                )
              })}
            />
            <Stack.Screen
              name={Constants.CONTACT_SCREEN} 
              component={ContactScreen}
              options={ ( {navigation} ) => ({
                headerRight: () => (
                  <Button mode="text" color={"#458f59"} onPress={() => navigation.navigate(Constants.ADD_CONTACT_SCREEN)}>
                      ADD+
                  </Button>
                )
              })}
            />
            <Stack.Screen
              options={({ route }) => ({ title: route.params.title })}
              name={Constants.CONVERSATION_CHAT_SCREEN} 
              component={ConversationChatScreen}
            />
            <Stack.Screen 
              options={{ title: 'Add Contact' }}
              name={Constants.ADD_CONTACT_SCREEN} 
              component={AddContactScreen}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}