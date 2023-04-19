import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable , Button} from 'react-native';  //Importing the components we need
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DBContext from '../LocalDB/DBContext';
import { TinitusCollectionName } from '../LocalDB/LocalDb';
import Constants from 'expo-constants';

export default function ModalEpisodeAdd({ isVisible, children, onClose, showToast, setToastContent  }) {

    const [textvalue, onChangeText] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const { db } = useContext(DBContext);

    const showDatePicker = () => {
      setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
      setSelectedDate(date);
      hideDatePicker();
    };

    const onButtonPress = () => {
      saveOccurance().then();
      setToastContent(toastContent);
      showToast();  
      onClose();
    };

    const saveOccurance = async () => {
      console.log("saved Tinitus orrcurence")
      await db[TinitusCollectionName].insert({ 
        userId: Constants.expoConfig.extra.userId,
        dateTime: selectedDate.toISOString(),
        notes: ''
       });
      return true;
    }

    const toastContent = (
      <View style={styles.episodetoast}>
        {/* <Text style={styles.episodetoasttext}>Episode added!</Text> */}
        <Image source={require("../assets/episodetoasticon.png")} style={styles.toastimage}/>
      </View>
    );

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
                      <Text style={styles.timelabel}>{selectedDate ? selectedDate.toLocaleTimeString() : 'No time selected'}</Text>
                      <Button title="Edit" color= "#735BF2" paddingLeft="8" onPress={showDatePicker} style={styles.timebutton} />
                        <DateTimePickerModal
                          date={selectedDate}
                          isVisible={datePickerVisible}
                          mode="time"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                        /> 
                    </View>
                </View>
            </View>
            
            <View style={{ flex:8}}>
                <Text style={styles.Subtext}>Take note about how you are feeling now</Text>
                    <View style={{ paddingHorizontal:20, marginTop:16}}>
                        <TextInput
                            style={styles.multilinetextinput}
                            value={textvalue}
                            placeholder="Type here to take your note!"
                            onChangeText={onChangeText}
                            multiline={true}
                            editable={true}
                            numberOfLines={18}
                        />
                    </View>
            </View>

            <View style={styles.buttondiv}>
                <Button  title="Save" color="#735BF2" onPress={onButtonPress} />                
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
    toastimage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
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
    episodetoast: {
      width: 200,
      height: 200,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: "center",
      flex:1,
    },  
    episodetime: {
      flex: 1,
      paddingLeft: 20,
      flexDirection: 'row',      
      alignItems: 'flex-start',
    },
    labeltext: {
      color: '#2A1342',
      fontSize: 16,
      paddingHorizontal: 10,
      marginTop: 10,
      flex: 6,
    },
    timefield: {
        flex: 8,
        paddingLeft: 70,
        paddingRight: 20,
        flexDirection: 'row',
        display: 'flex',
        justifyContent: "center",
    },
    timelabel: { 
      flex: 6,
      fontSize: 16, 
      fontWeight: 'bold',
      marginTop: 10,
    },      
    timebutton: { 
        flex: 4,
        justifyContent: "start",
        alignSelf: 'flex-start',
        fontSize: 16, 
    }
  });