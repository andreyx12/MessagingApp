
 import * as React from 'react';
 import {
   Text,
   View,
   StyleSheet
 } from 'react-native';

const BubblePosition = {
    LEFT: 'left',
    RIGHT: 'right',
}
 
const ChatBubble = ({ message, position }) => {

   return (
    <View style={[styles.bubble, position === BubblePosition.LEFT ? styles.bubblePositionLeft : styles.bubblePositionRight]}>
        <Text style={[styles.bubbleText]}>{message.content}</Text>
     </View>
   );
 };

const styles = StyleSheet.create({
    bubble: {
        flex: 1,
        maxWidth: 140,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    bubbleText: {
        paddingTop: 5,
        color: 'white'
    },
    bubblePositionLeft: {
        backgroundColor: '#458f59',
        marginLeft: 'auto',
    },
    bubblePositionRight: {
        backgroundColor: '#85c797',
        marginRight: 'auto',
    },
});
 
 export { ChatBubble, BubblePosition };