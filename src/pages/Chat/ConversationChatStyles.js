import { StyleSheet } from "react-native";
import * as Constants from '../../utils/Constants';

export default conversationChatStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 10
      },
      messageInput: {
        flex: 4,
      },
      emptyMessage: {
        textAlign: "center"
      },
      sendButton: {
        flex: 1,
      },
      horizontal: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: Platform.OS === Constants.IOS ? 30 : 0,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: window.width, 
        margin: 10, 
        padding:4, 
        alignItems:'center', 
        justifyContent:'center', 
        borderWidth:1, 
        borderColor:'gray', 
        borderRadius: 10, 
    },
    bubbleLeft: {
      backgroundColor: '#fcba03',
      height: 40,
      width: 60,
      marginTop: 10,
      marginBottom: 10,
      padding: 2
    },
    avatar: {
      backgroundColor: "gray"
    },
    li: {
      backgroundColor: "white",
      shadowColor: "#000000",
      shadowOpacity: 0.4,
      shadowRadius: 1,
      shadowOffset: {
        height: 1,
        width: 1
      }
    }
});