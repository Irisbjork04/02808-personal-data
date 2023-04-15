import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment'

const MonthView = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

    const getEventsForDay = (date) => {
        return events.filter((event) => event.date === date);
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.insightContainer}>
              <Text style={{fontSize: 16, fontWeight: "500", color: "#061428"}}>Insights</Text>
            </View>
            <View style={styles.noteCalendarContainer}>
                <Image source={require("../assets/circleicon.png")} style={styles.imageNote} />
                <View style={{flex:2}}>
                    <Text style={{fontSize: 12, fontWeight: "300", color: "#061428"}}>Circle sizes indicate the number of occurrences of tinnitus episodes in a day.</Text>
                </View>
               
            </View>
            <View style={styles.calendarContainer}> 
                <CalendarList 
                    style={{
                    borderColor: 'gray',
                    height: 400
                    }}
                    onDayPress={onDayPress} />
                {/* <Text style={{fontSize: 20, fontWeight: "400",}}>Month View</Text>            */}
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
        flex: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8F3F1'
      },
      insightContainer: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
      noteCalendarContainer: {
        flex: 2,      
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E8F3F1'
      },
      imageNote:{
        height: 20,
        width: 20,
        marginRight: 10,
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

export default MonthView;