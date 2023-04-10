
import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  //Importing the components we need
import {useState,useEffect } from 'react';
import { RootSiblingParent } from 'react-native-root-siblings';
import LayoutScreen from "./screens/layout";

//In react native we dont use raw html -> view is like <div
//SafeAreaView adds padding and makes sure that our content isn't cut.
//This is platform independent (f.ex View -> UIView in iOS when we run it).
export default function App() {

  const image = require("./assets/base.png"); //Importing the image from the assets folder
  const [isMounted, setIsMounted] = useState(false);
  const [timePassed, setTimePassed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (isMounted) {
      setTimeout(function () {
        setTimePassed(true);
      }, 1000);
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  const onAddSticker = () => {
    console.log("Add Sticker")
    setIsModalVisible(true);
};

const onModalClose = () => {
    console.log("Add Sticker on Modal close")
    setIsModalVisible(false);
};

  if (timePassed == false) {
    return (
      <ImageBackground source={image} style={styles.image}>
          <SafeAreaView style={styles.container}> 
              <TouchableOpacity onPress={onAddSticker}>  
                  <Image  source={require("./assets/app_welcome_text.png")} />
              </TouchableOpacity>
            <StatusBar style="auto" />
          </SafeAreaView>
      </ImageBackground>
    );
  }
  else {
    return (
      <RootSiblingParent>
        <View style={styles.layout}>
          <LayoutScreen></LayoutScreen>
        </View>
      </RootSiblingParent>
    );
  }
}

const styles = StyleSheet.create({
  container: { // This is just a regular JavaScript property not CSS
    flex: 1, //This makes the view flow to the entire screen
    alignItems: 'center', //Next two lines make sure that 
    justifyContent: 'center',
  },
  layout: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  splash: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh"
  },
  text: {
    fontSize: 20
  }
});


