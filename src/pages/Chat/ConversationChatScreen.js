 import React, { useEffect, useContext, useState } from 'react';
 import {
   Button,
   View,
   FlatList,
   Platform,
 } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import GeneralContext from '../../common/GeneralContext';
import {ChatBubble, BubblePosition} from '../../component/ChatBubble';
import { formatMessage } from '../../utils/ChatUtils';
import * as Constants from '../../utils/Constants';
import conversationChatStyles from './ConversationChatStyles';
 
let channel;

const ConversationChatScreen = ({ route }) => {

    const [messages, setMessages] = useState(null);
    const [currentMessage, setCurrentMessage] = useState(null);
    const generalContext = useContext(GeneralContext);

    let channelHandler = new generalContext.sendbird.ChannelHandler();

    useEffect(() => {
      initChat();
      generalContext.sendbird.addChannelHandler(Constants.HANDLER_ID, channelHandler);
      return () => {
        generalContext.sendbird.removeChannelHandler(Constants.HANDLER_ID);
      };
    }, []);

    const initChat = () => {
      generalContext.sendbird.GroupChannel.getChannel(route.params.channelUrl, (currentChannel, error) => {
        if (error) {
          
        } else {
          channel = currentChannel;
          loadHistory();
        }
      })
    }
    
    channelHandler.onMessageReceived = (channel, message) => {
        if (channel.url === route.params.channelUrl) {
          addNewMessage(message);
        }
    }

    addNewMessage = (message) => {
      let temp = formatMessage(message);
      setMessages([...messages, temp]);
    }


    loadHistory = () => {
      let messageListQuery = channel.createPreviousMessageListQuery()
      messageListQuery.load(30, false, (messageList, error) => {
        if (error) {
          console.log(err);
        } else {
          const formattedMessage = messageList.map(item => formatMessage(item));
          setMessages(formattedMessage);
        }
      })
    }

    sendMessage = () => {      
      channel.sendUserMessage(
        currentMessage,
        (message, err) => {
          setCurrentMessage(Constants.EMPTY_STRING);
          if (err) {
            console.log(err);
          } else {
            let formattedMessage = formatMessage(message);
            const newArr = [...messages]
            newArr.push(formattedMessage);
            setMessages(newArr);
          }
        }
      )
    }
  
    const ChatList = () =>  {
      if (messages != null) {
        return (
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <ChatBubble message={item} position={item.userId === generalContext.sendbird.currentUser.userId ? BubblePosition.RIGHT : BubblePosition.LEFT}></ChatBubble>
            )}
          />
        );
      } else {
        return (
          <View style={[conversationChatStyles.container]}>
            <ActivityIndicator size="large" color="green" />
          </View>
        )
      }
    }

   return (
     <KeyboardAvoidingView keyboardVerticalOffset={100} behavior={Platform.OS === Constants.IOS ? 'padding' : Constants.EMPTY_STRING} style={[conversationChatStyles.container, conversationChatStyles.horizontal]}>
        <ChatList/>
        <View style={[conversationChatStyles.footer]}>
            <View style={[conversationChatStyles.messageInput]}>
            <TextInput
                  placeholder='Write a message'
                  defaultValue={currentMessage}
                  onChangeText={newText => setCurrentMessage(newText)}
                ></TextInput>
            </View>
             <View style={[conversationChatStyles.sendButton]}>
                <Button title="Send" onPress={()=> sendMessage()} color={"#458f59"}></Button> 
              </View>
        </View>
     </KeyboardAvoidingView>
   );
 };

 export default ConversationChatScreen;
 