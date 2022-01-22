import { StyleSheet } from "react-native";
import * as Constants from "../../utils/Constants";

export default loginStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#a6a6a6'
    },
    contentContainer: {
      margin: 10,
      backgroundColor: '#fff',
    },
    innerContainer: {
      margin: 10
    },
    title: {
      textAlign: 'center',
      margin: 50,
      fontSize: 35
    },
    textLabel: {
      fontWeight: 'bold',
      marginBottom: 10,
    },
    errorLabel: {
      color: 'red',
      marginTop: 5
    },
    input: {
      height: 40,
      borderWidth: 1,
      padding: 10
    },
    enterButton: {
      marginTop: 40
    },
    registerButton: {
      marginTop: 15,
      marginBottom: 20
    }
});