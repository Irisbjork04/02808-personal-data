import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable } from 'react-native';  //Importing the components we need
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DBContext from '../LocalDB/DBContext';
import CurrentUserContext from '../LocalDB/CurrentUserContext';

export default function ModalNotesAdd({ isVisible, children, onClose }) {
  const { db } = useContext(DBContext);
  const { userCredentials } = useContext(CurrentUserContext);
  
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Today's Notes</Text>
            <Pressable onPress={onClose} style={styles.addView}>
              {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
              <Image source={require("../assets/addIcon.png")} style={styles.image} />
            </Pressable>
            <Pressable onPress={onClose}>
              {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
              <Image source={require("../assets/closeIcon.png")} style={styles.image} />
            </Pressable>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.labeltext}>Viewing history of your notes will be available on T-Miinus version 2.0</Text>          
          </View>
          {/* {children} */}
        </View>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalContent: {
      height: '40%',
      width: '100%',
      borderTopWidth: 1,
      borderTopColor: '#E8F3F1',
      backgroundColor: '#ffffff',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
      flex: 1,
      flexDirection: 'column',
    },
    titleContainer: {
      backgroundColor: '#ffffff',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex:1,
    },
    title: {
      color: '#222B45',
      fontSize: 20,
      flex: 2,
    },
    addView: {
      flex: .5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    formContainer:{
      flex: 5,
    },
    labeltext: {
      color: '#8F9BB3',
      fontStyle: 'italic',
      fontSize: 14,
      marginHorizontal: 30,
      marginVertical: 50,
      textAlign: 'center',
      fontVariant: ['small-caps'],
      flex: 6,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    image: {
      width: 22,
      height: 22,
      resizeMode: 'cover',
  }
});