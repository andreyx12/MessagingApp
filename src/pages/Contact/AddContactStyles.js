import { StyleSheet } from "react-native";
import * as Constants from "../../utils/Constants";

export default addContactStyle = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       marginTop: 10
    },
    innerContainer: {
      margin: 10
    },
    title: {
      textAlign: 'center',
      margin: 50,
      fontSize: 35
    },
    avatar: {
      backgroundColor: "gray"
    },
    textLabel: {
      fontWeight: 'bold',
      marginBottom: 10,
    },
    errorLabel: {
      color: 'red',
      marginTop: 5,
      marginBottom: 15
    },
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10
    },
    enterButton: {
      marginTop: 20
    },
    registerButton: {
      marginTop: Platform.OS === Constants.IOS ? 5 : 20,
      marginBottom: 20
    },
    registerImage: {
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 200,
      height: 200
    }
});