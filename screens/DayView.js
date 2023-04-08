import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'; 

const DayView = ({ navigation }) => {

    return (

        <View>
            <Text style={{ fontSize: 30 }}>Day View</Text>
            <View style={{flex: 1, backgroundColor: 'red'}} />
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', //Next two lines make sure that 
      justifyContent: 'center',
    },
  });

export default DayView;