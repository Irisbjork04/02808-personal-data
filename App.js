import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';  

//In react native we dont use raw html -> view is like <div
//SafeAreaView adds padding and makes sure that our content isn't cut.
//This is platform independent (f.ex View -> UIView in iOS when we run it).
export default function App() {
  const handlePress = () => console.log("Text pressed")
  console.log(require("./assets/logo.png"));

  return (
    <SafeAreaView style={styles.container}> 
      <Text onPress={handlePress}>Welcome to T-Minus!</Text> 
      <Image source={require("./assets/logo.png")} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

//Creating the styles contain ment
const styles = StyleSheet.create({
  container: { // This is just a regular JavaScript property not CSS
    flex: 1, //This makes the view flow to the entire screen
    backgroundColor: '#217BF9',
    alignItems: 'center', //Next two lines make sure that 
    justifyContent: 'center',
  },
});
