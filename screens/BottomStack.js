import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  
// import { IconComponentProvider, Icon } from "@react-native-material/core";

import ModalEpisodeAdd from '../modals/ModalEpisode';
import ModalSleepHrsAdd from '../modals/ModalSleep';
import ModalNotesAdd from '../modals/ModalNotes';

const BottomStack = ({ navigation, showToast, setToastContent }) => {

    const [showAppOptions, setShowAppOptions] = useState(false);
    const [isEpisodeModalVisible, setIsEpisodeModalVisible] = useState(false);
    const [isSleepModalVisible, setIsSleepModalVisible] = useState(false);
    const [isNotesModalVisible, setIsNotesModalVisible] = useState(false);

    const onAddEpisodeModal = () => {
        console.log("Add Sticker")
        setIsEpisodeModalVisible(true);
        setIsSleepModalVisible(false);
        setIsNotesModalVisible(false);        
    };

    const onAddSleepModal = () => {
        console.log("Add Sticker")
        setIsEpisodeModalVisible(false);
        setIsSleepModalVisible(true);
        setIsNotesModalVisible(false);        
    };

    const onAddNotesModal = () => {
        console.log("Add Sticker")
        setIsEpisodeModalVisible(false);
        setIsSleepModalVisible(false);
        setIsNotesModalVisible(true);        
    };

    const onEpisodeModalClose = () => {
        setIsEpisodeModalVisible(false);
    };
    
    const onSleepModalClose = () => {
        setIsSleepModalVisible(false);
    };

    const onNotesModalClose = () => {
        setIsNotesModalVisible(false);
    };

    return (
        <View style={styles.container}>

          <View style={styles.episode}>
            <TouchableOpacity onPress={onAddEpisodeModal}>    
                <Image source={require("../assets/bigiconepi.png")} style={styles.image} />        
            </TouchableOpacity>
            <ModalEpisodeAdd isVisible={isEpisodeModalVisible} onClose={onEpisodeModalClose} showToast={showToast} setToastContent={setToastContent} />
          </View>
          
          <View style={styles.sleep}>
            <TouchableOpacity onPress={onAddSleepModal}>    
                <Image source={require("../assets/bigiconsleep.png")} style={styles.image} />        
            </TouchableOpacity>
            <ModalSleepHrsAdd isVisible={isSleepModalVisible} onClose={onSleepModalClose} showToast={showToast} setToastContent={setToastContent}/>            
          </View>

          <View style={styles.notes}>
            <TouchableOpacity onPress={onAddNotesModal}>    
                <Image source={require("../assets/bigiconnotes.png")} style={styles.image} />       
            </TouchableOpacity>
            <ModalNotesAdd isVisible={isNotesModalVisible} onClose={onNotesModalClose} />     
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 2,
      paddingTop: 12,
      flexDirection: 'row',
      shadowColor: "#008b8b",
      shadowOffset: {width: 0, height: 12},
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: .95,
      // borderTopWidth: 1,
      // borderTopColor: '#E8F3F1',
    },
    episode: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
    sleep: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
    notes: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      },
    box: {
      width: 10,
      height: 30,
    },
    image: {
        width: 40,
        height: 35,
        resizeMode: 'cover',
    },
    row: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      paddingHorizontal: 8,
      paddingVertical: 6,
      borderRadius: 4,
      backgroundColor: 'oldlace',
      alignSelf: 'flex-start',
      marginHorizontal: '1%',
      marginBottom: 6,
      minWidth: '48%',
      textAlign: 'center',
    },
    selected: {
      backgroundColor: 'coral',
      borderWidth: 0,
    },
    buttonLabel: {
      fontSize: 12,
      fontWeight: '500',
      color: 'coral',
    },
    selectedLabel: {
      color: 'white',
    },
    label: {
      textAlign: 'center',
      marginBottom: 10,
      fontSize: 24,
    },
  });
export default BottomStack;