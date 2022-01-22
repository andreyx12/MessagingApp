import React, { useEffect, useContext, useState } from 'react';
 import {
   SafeAreaView,
 } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native' 
import { ActivityIndicator, Avatar, Divider, List, Text } from 'react-native-paper';

import GeneralContext from '../../common/GeneralContext';
import chatStyles from './ChatStyles';
import * as Constants from '../../utils/Constants';
 
const ChatScreen = ({ navigation }) => {

  const generalContext = useContext(GeneralContext);
  const [userList, setUserList] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    fetchGroups();
  }, [isFocused]);

  const fetchGroups = () =>  {
    var listQuery = generalContext.sendbird.GroupChannel.createMyGroupChannelListQuery();
    listQuery.memberStateFilter = Constants.MEMBER_STATE_FILTER; 
    listQuery.order = Constants.CHAT_ORDER;
    if (listQuery.hasNext) {
        listQuery.next(function(groupChannels, error) {
            if (error) {
                console.log(error);
            } else {
              const newArray = [];
              setUserList([...newArray, ...groupChannels]);
            }
        });
    }
  }

  const ChatList = () =>  {
    if (userList !== null) {
      if (userList.length > 0) {
        return (
          <FlatList
            data={userList}
            renderItem={({ item }) => (
              <List.Item
                  style={chatStyles.li}
                  onPress={() => navigation.navigate(Constants.CONVERSATION_CHAT_SCREEN, { channelUrl: item.url, title: item.name })}
                  title={item.name}
                  description={item.lastMessage.message}
                  left={props =>  <Avatar.Text size={60} color='white' label={item.name.toUpperCase().substring(0, 2)} style={ chatStyles.avatar }/>}
                  right={props =>  <Text>{new Date(item.createdAt).toLocaleDateString()}</Text>}
                />
            )}
            keyExtractor={item => item.url}
            ItemSeparatorComponent={() => (
              <Divider />
            )}
          />
         )
        } else {
          return <Text style={chatStyles.emptyMessage}>- There are no chats at this time -</Text>
        }
    } else {
      return (
        <ActivityIndicator size="large" color="green" />
      )
    }
  }

   return (
     <SafeAreaView style={[chatStyles.container]}>
       <ChatList/>
     </SafeAreaView>
   );
 };
 
 export default ChatScreen;
 