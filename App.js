import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground } from 'react-native';  //Importing the components we need

const image = require("./assets/base.png"); //Importing the image from the assets folder

//In react native we dont use raw html -> view is like <div
//SafeAreaView adds padding and makes sure that our content isn't cut.
//This is platform independent (f.ex View -> UIView in iOS when we run it).
export default function App() {
  const handlePress = () => console.log("Text pressed")
  console.log(require("./assets/app_welcome_text.png"));

  return (
    <ImageBackground source={image} style={styles.image}>
      <SafeAreaView style={styles.container}> 
        {/* <Text onPress={handlePress}>Welcome to T-Minus!</Text>  */} 
          <Image onPress={handlePress} source={require("./assets/app_welcome_text.png")} />
          <StatusBar style="auto" />
      </SafeAreaView>
    </ImageBackground>
  );
}

//Creating the styles contain ment
const styles = StyleSheet.create({
  container: { // This is just a regular JavaScript property not CSS
    flex: 1, //This makes the view flow to the entire screen
    // backgroundColor: '#217BF9', // We are using image instead of background color
    alignItems: 'center', //Next two lines make sure that 
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
