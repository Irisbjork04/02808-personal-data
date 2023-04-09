import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable } from 'react-native';  //Importing the components we need
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function ModalNotesAdd({ isVisible, children, onClose }) {
    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add Notes</Text>
            <Pressable onPress={onClose}>
              {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
              <Image source={require("../assets/closeIcon.png")} style={styles.image} />
            </Pressable>
          </View>
          {children}
        </View>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalContent: {
      height: '25%',
      width: '100%',
      backgroundColor: '#ffffff',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '16%',
      backgroundColor: '#ffffff',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#222B45',
      fontSize: 20,
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
    },
  });