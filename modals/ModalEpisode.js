import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import React, { Component, useState } from 'react';
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable , Button} from 'react-native';  //Importing the components we need
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function ModalEpisodeAdd({ isVisible, children, onClose }) {
    const [textvalue, onChangeText] = useState('Type here to take your note!');
        

    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add episode</Text>
            <Pressable onPress={onClose}>
              {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
              <Image source={require("../assets/closeIcon.png")} style={styles.image} />
            </Pressable>
          </View>
          <View style={styles.formContainer}>
            <View style={{ flex:2}}>
                <Text style={styles.Subtext}>Occured at</Text>
                <View style={styles.episodetime}>
                    <Text style={styles.labeltext}>Episode Time</Text>
                    <View style={styles.timefield}>
                        <Text style={styles.labeltext}>Episode Time</Text>
                    </View>
                </View>
            </View>
            
            <View style={{ flex:8}}>
                <Text style={styles.Subtext}>Take note about how you are feeling now</Text>
                    <View style={{ paddingHorizontal:20, marginTop:16}}>
                        <TextInput
                            style={styles.multilinetextinput}
                            value={textvalue}
                            onChangeText={onChangeText}
                            multiline={true}
                            editable={true}
                            numberOfLines={18}
                        />
                    </View>
            </View>

            <View style={styles.buttondiv}>
                <Button  title="Save" color="#735BF2" />
            </View>
            
          </View>
        </View>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalContent: {
      height: '80%',
      width: '100%',
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
      flex:1
    },
    title: {
      color: '#222B45',
      fontSize: 20,
      flex: 2,
    },
    formContainer:{
        flex: 8,
    },
    Subtext: {
        color: '#8348EF',
        fontSize: 14,
        paddingHorizontal: 30,
    },
    labeltext: {
        color: '#2A1342',
        fontSize: 16,
        paddingHorizontal: 10,
        marginTop: 10,
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
    episodetime: {
        flex: 1,
        paddingLeft: 20,
        flexDirection: 'row',
    },
    timefield: {
        flex: 12,
        // paddingLeft: 20,
        flexDirection: 'row',
    },
    multilinetextinput: {
        // width:200,
        borderRadius : 10,
        borderBottomWidth:.5,
        borderRightWidth:.5,
        borderLeftWidth:.5,
        borderTopWidth:.5,
        borderRightColor: '#EDF1F7',
        borderLeftColor: '#EDF1F7',
        borderTopColor: '#EDF1F7',
        borderBottomColor: '#EDF1F7',
        paddingHorizontal : 16,      
        textAlignVertical: 'top',
        paddingVertical: 16,  
    },
    buttondiv: {
        paddingHorizontal: 8,
        paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 20,
        flex:1,
      },
  });