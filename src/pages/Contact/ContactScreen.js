
import React, { useState, useContext, useEffect } from 'react';
 import {
   SafeAreaView,
   FlatList,
 } from 'react-native';
import { useIsFocused } from '@react-navigation/native' 
import { ActivityIndicator, Avatar, Divider, List, Text } from 'react-native-paper';

import contactStyle from './ContactStyles' 
import { getContactFromUserList } from '../../utils/ContactUtils' 
import GeneralContext from '../../common/GeneralContext';
import * as Constants from '../../utils/Constants';

 
const ContactScreen = ({ navigation }) => {

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
      listQuery.includeEmpty = true;

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

    const ListItem = (item) =>  {
      let userInfo = getContactFromUserList(item, generalContext.sendbird.currentUser.userId);
      return (
        <List.Item
          style={contactStyle.li}
          onPress={() => navigation.navigate(Constants.CONVERSATION_CHAT_SCREEN, { channelUrl: item.url, title: item.name })}
          title={userInfo.nickname}
          description={userInfo.userId}
          left={ _ =>  <Avatar.Text size={60} color='white' label={userInfo.nickname.substring(0, 2)} style={ contactStyle.avatar }/>}
          right={ _ => <Text>{userInfo.connectionStatus}</Text>}
        />
      );
    }

    const ChatList = () =>  {
      if (userList !== null) {
        if (userList.length > 0) {
          return (
            <FlatList
              data={userList}
              renderItem={({ item }) => ListItem(item)}
              keyExtractor={item => item.url}
              ItemSeparatorComponent={() => (
                <Divider/>
              )}
            />
          )
        } else {
          return <Text style={contactStyle.emptyMessage}>- There are no contacts registered at this time -</Text>
        }
      } else {
        return <ActivityIndicator size="large" color="green" />
      }
    }
  
     return (
      <SafeAreaView style={[contactStyle.container]}>
        <ChatList></ChatList>
       </SafeAreaView>
     );
};

 export default ContactScreen;
 