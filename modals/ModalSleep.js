import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import React, { Component, useState, useContext  } from 'react';
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity, SafeAreaView, ImageBackground, Modal, Pressable , Button} from 'react-native';  //Importing the components we need
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DBContext from '../LocalDB/DBContext';
import { SleepTimeCollectionName } from '../LocalDB/LocalDb';

export default function ModalSleepHrsAdd({ isVisible, children, onClose, showToast, setToastContent  }) {

    const [textvalue, onChangeText] = useState('Type here to take your note!');
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [dateStartPickerVisible, setStartDatePickerVisible] = useState(false);
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const [dateEndPickerVisible, setEndDatePickerVisible] = useState(false);    
    const { db } = useContext(DBContext);

    const showStartDatePicker = () => {
      setStartDatePickerVisible(true);
    };

    const hideStartDatePicker = () => {
      setStartDatePickerVisible(false);
    };

    const handleStartDateConfirm = (date) => {
      hideStartDatePicker();
      setSelectedStartDate(date);
    };

    const showEndDatePicker = () => {
      setEndDatePickerVisible(true);
    };

    const hideEndDatePicker = () => {
      setEndDatePickerVisible(false);
    };

    const handleEndDateConfirm = (date) => {
      hideEndDatePicker();
      setSelectedEndDate(date);
    };

    const onButtonPress = () => {
      // endtime cannot be before starttime
      if (selectedStartDate.setMilliseconds(0) >= selectedEndDate.setMilliseconds(0)) {
        console.log(selectedStartDate, selectedEndDate  )
        setToastContent(toastContent("fail"));
        showToast();
        return;
      }

      saveSleepTime().then();
      setToastContent(toastContent("success"));
      showToast();  
      onClose();
    };

    const saveSleepTime = async () => {
      await db[SleepTimeCollectionName].insert({ 
        userId: 1,
        startDateTime: selectedStartDate.toISOString(),
        endDateTime: selectedEndDate.toISOString()
       });

      console.log("Saved Sleep Time")
    }

    const isDiscardSleepVisible = () => {
      return selectedStartDate.valueOf() != selectedEndDate.valueOf()
      // selectedStartDate.getTime() != selectedStartDate.getTime();
      // selectedStartDate.toDateString() != selectedStartDate.toDateString();
      // selectedStartDate != selectedEndDate;
    };

    const hideDiscardSleep = () => {      
      console.log('+x === +y', selectedStartDate.getTime(), selectedEndDate.getTime());
      setSelectedStartDate(new Date());
      setSelectedEndDate(new Date());
    };

    const toastContent = (status="success") => {
      console.log(status)
      if (status === "success"){
        return (
          <View style={styles.episodetoast}>
            {/* <Text style={styles.episodetoasttext}>Episode added!</Text> */}
            <Image source={require("../assets/sleephrsaddedicon.png")} style={styles.toastimage}/>
          </View>
        )
      }
      return (
        <View style={styles.episodetoast}>
          <Text >End time cannot be before start time</Text>
        </View>
      )
      
  };

  const dateLabel = (date) => {
    return (new Date(date).setHours(0,0,0,0) == new Date().setHours(0,0,0,0))? "Today" : "Yesterday";
  }

    return (
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Add sleep</Text>
            <Pressable onPress={onClose}>
              {/* <MaterialIcons name="close" color="#fff" size={22} /> */}
              <Image source={require("../assets/closeIcon.png")} style={styles.image} />
            </Pressable>
          </View>
          <View style={styles.formContainer}>
            <View style={{ flex:2}}>
                <Text style={styles.Subtext}>
                  { dateLabel(selectedStartDate) }
                </Text>
                <View style={styles.episodetime}>
                    <Text style={styles.labeltext}>Slept at</Text>
                    <View style={styles.timefield}>
                      <Text style={styles.timelabel}>{selectedStartDate ?  selectedStartDate.toLocaleTimeString() : 'No time selected'}</Text>
                      <Button title="Edit" color= "#735BF2" paddingLeft="8" onPress={showStartDatePicker} style={styles.timebutton} />
                        <DateTimePickerModal
                          date={selectedStartDate}
                          isVisible={dateStartPickerVisible}
                          mode="datetime"
                          onConfirm={handleStartDateConfirm}
                          onCancel={hideStartDatePicker}
                          minimumDate = {new Date(new Date().getDate() - 1)}
                          maximumDate = {new Date()}
                        /> 
                    </View>
                </View>
                <Text style={styles.Subtext}>{ dateLabel(selectedEndDate) }</Text>
                <View style={styles.episodetime}>
                    <Text style={styles.labeltext}>Woke up at</Text>
                    <View style={styles.timefield}>
                      <Text style={styles.timelabel}>{selectedEndDate ? selectedEndDate.toLocaleTimeString() : 'No time selected'}</Text>
                      <Button title="Edit" color= "#735BF2" paddingLeft="8" onPress={showEndDatePicker} style={styles.timebutton} />
                        <DateTimePickerModal
                          date={selectedEndDate}
                          isVisible={dateEndPickerVisible}
                          mode="datetime"
                          onConfirm={handleEndDateConfirm}
                          onCancel={hideEndDatePicker}
                          minimumDate = {new Date(new Date().getDate() - 1)}
                          maximumDate = {new Date()}
                        /> 
                    </View>
                </View>

            </View>

            <View style={styles.buttondiv}>
                <Button  title="Save" color="#735BF2" onPress={onButtonPress} />        
            </View>
            { isDiscardSleepVisible() && 
              <View style={styles.buttondiv}>  
                <Pressable onPress={hideDiscardSleep}><Text style={styles.buttonText}>Discard sleep hours</Text></Pressable>           
              </View>
            }
            
          </View>
        </View>
      </Modal>
    );
  }

  const styles = StyleSheet.create({
    modalContent: {
      height: 'auto',
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
      marginVertical: 20,
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
    formContainer:{
        flex: 5,
    },
    Subtext: {
        color: '#8348EF',
        fontSize: 14,
        paddingHorizontal: 30,
        marginVertical: 5,
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
        // paddingHorizontal: 8,
        // paddingVertical: 8,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 12,
        justifyContent: 'flex-end',
        flex:1,
      },
    buttonText: {
      marginHorizontal: 20,
      marginVertical: 20,
      textAlign: 'center',      
      color: '#8348EF',
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
      // marginVertical: 5,
      marginBottom: 12,
    },
    labeltext: {
      color: '#2A1342',
      fontSize: 16,
      paddingHorizontal: 10,
      marginTop: 10,
      flex: 5,
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
      flex: 4,
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