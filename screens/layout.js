import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import React, {  useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  //Importing the components we need
import BottomStack from './BottomStack';
import TopStack from './TopStack';
import UserAccountScreen from "./UserAccount";
import Toast from 'react-native-root-toast';
import setimmediate from 'setimmediate';
import DBContext from '../LocalDB/DBContext';
import CurrentUserContext from '../LocalDB/CurrentUserContext';
import { LocalCollectionName } from '../LocalDB/LocalDb';


const LayoutScreen = ({ navigation }) => {

    const [toastVisible, setToastVisible] = useState(false);
    const [toastContent, setToastContent] = useState("This is a message!!");
    const [userCredentials, setUserCredentials] = useState(null);
    const { db } = useContext(DBContext);

    useEffect(() => {
      let subLocal;
      if (db && db[LocalCollectionName]) {
        subLocal = db[LocalCollectionName]
              .findOne()
              .$.subscribe((data) => {
                if(!data) return;

                console.log("User Data exist in Local Storage: ", data);
                setUserCredentials(data._data);
              });
      }

      return () => {
        if (subLocal && subLocal.unsubscribe) subLocal.unsubscribe();
      };
    }, []);


    const showToast = () => { 
      setToastVisible(true);

      setTimeout(() => { 
          setToastVisible(false); 
      }, 4000);
    };

    const tostNode = (
      <Toast
          visible={toastVisible}
          position={300}
          shadow={true}
          animation={false}
          hideOnPress={true}
          backgroundColor="white"
      >{toastContent}</Toast>
    );


    if(!userCredentials) {
      return (
        <View style={styles.container}>
          <UserAccountScreen showToast={showToast} setToastContent={setToastContent} />
          {tostNode}
        </View>
      )
    }

    return (
      <CurrentUserContext.Provider value={{userCredentials}}>
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
            
            {tostNode}
          </View>
      </CurrentUserContext.Provider>
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