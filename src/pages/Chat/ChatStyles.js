import { StyleSheet } from "react-native";
import * as Constants from '../../utils/Constants';

export default chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 10
      },
      emptyMessage: {
        textAlign: "center"
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