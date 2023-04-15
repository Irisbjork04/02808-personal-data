import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import React, {  useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  //Importing the components we need
import BottomStack from './BottomStack';
import TopStack from './TopStack';
import Toast from 'react-native-root-toast';
import setimmediate from 'setimmediate';

const LayoutScreen = ({ navigation }) => {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState("This is a message!!");

    // const [toastSleepVisible, setToastSleepVisible] = useState(false);
    // const [toastSleepContent, setToastSleepContent] = useState("This is a message!!");

    const showToast = () => { 
      setToastVisible(true);

      setTimeout(() => { 
          setToastVisible(false); 
      }, 2000);
    };

    // const showSleepToast = () => { 
    //   setToastVisible(true);

    //   setTimeout(() => { 
    //       setToastVisible(false); 
    //   }, 2000);
    // };

    return (
        <View  style={styles.container}>
          <View style={styles.logo}>
            <Image source={require("../assets/T-minus.png")} style={styles.image} />
            <View style={{ flex: 12 }}/>
          </View>
          
          <View style={styles.content}>
            <TopStack></TopStack>
          </View>

          <View style={styles.footer}>
            <BottomStack showToast={showToast} setToastContent={setToastContent}></BottomStack>
          </View>
          <Toast
                visible={toastVisible}
                position={300}
                shadow={true}
                animation={false}
                hideOnPress={true}
                backgroundColor="white"
            >{toastContent}</Toast>

        </View>
      );

  };
  

const styles = StyleSheet.create({
    container: { // This is just a regular JavaScript property not CSS
      flexDirection: 'column',
      flex: 1,
    },
    content: {
      flex: 15,
    },
    footer: {
      flex: 1,
    },
    logo: {
      flex: 1,
      paddingLeft: 20,
      flexDirection: 'row',
    },
    image: {
      flex: 4,
      resizeMode: 'cover',
      width: 30,
      height: 50,
      justifyContent: 'space-around',
    },
    text: {
      fontSize: 20
    }
  });
  
  export default LayoutScreen;