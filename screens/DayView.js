import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'; 
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment'

const DayView = ({ navigation }) => {

  const [date, setDate] = useState(moment());
  const [isNextAvailable, setIsNextAvailable] = useState(false);

  const isToday = () => date.isSame(new Date(), "day");
  
  const nextDate = () => {
    const newDate = date.clone().add(1, 'day');
    setIsNextAvailable(newDate.date() != moment().date());
    setDate(newDate);
  };

  const prevDate = () => {
    const newDate = date.clone().subtract(1, 'day');
    console.log(newDate.format())
    setIsNextAvailable(newDate.date() != moment().date());
    setDate(newDate);
  };

  const displayDate = () => {
    return isToday()? 'Today - ' + date.format("dddd, MMMM D YYYY") : date.format("dddd, MMMM D YYYY");
  }
  
  const nextArrow = () => {
    if(isNextAvailable) {
      return (
        <TouchableOpacity  onPress={nextDate} >
            <Image source={require("../assets/rightArrowActive.png")} style={styles.image}/>  
        </TouchableOpacity> 
      );
    }else {
      return (
        <Image source={require("../assets/arrowInactive.png")} style={styles.image}/>  
      )
    }
  }

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}> 
          <View style={styles.insightContainer}>
            <Text style={{fontSize: 16, fontWeight: "500", color: "#061428"}}>Insights</Text>
          </View>

          <View style={styles.calendarContainer}> 
          <TouchableOpacity  onPress={prevDate} >
              <Image source={require("../assets/leftArrowActive.png")} style={styles.image}/>
            </TouchableOpacity>
                <Text style={{fontSize: 16, fontWeight: "400", color: "#555F72"}}>{displayDate()}</Text>  
            {nextArrow()}      
          </View>

          <View style={styles.graphscontainner}>
            <ScrollView style={styles.scrollView}>
              <Text style={{ fontSize: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.</Text>
            </ScrollView>
          </View>   

        </View>
      </View>  
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white',
    },
    formContainer:{
      flex: 8,
    },
    calendarContainer:{
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#E8F3F1'
    },
    image: {
      width: 22,
      height: 22,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
    },
    insightContainer: {
      borderBottomWidth: 1,
      borderBottomColor: '#E8F3F1',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      // marginVertical: 4,
    },
    graphscontainner: {
      flex: 8,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    scrollView: {
      marginHorizontal: 10,
      marginVertical: 15,
    },
  });

export default DayView;