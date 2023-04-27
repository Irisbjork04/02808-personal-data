import React, { Component, useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import DBContext from '../LocalDB/DBContext';
import CurrentUserContext from '../LocalDB/CurrentUserContext';
import { TinitusCollectionName } from '../LocalDB/LocalDb';
import { frequencyDistribution } from './helper/frequency';


const MonthView = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [tinitusData, setTinitusData] = useState([]);
    const { db } = useContext(DBContext);
    const { userCredentials } = useContext(CurrentUserContext);

    useEffect(() => {
      let subTinitus;
      if (db && userCredentials && db[TinitusCollectionName]) {
        subTinitus = db[TinitusCollectionName]
              .find({
                selector: {
                  userId: userCredentials.email
                }
              })
              .sort({ dateTime: 1 })
              .$.subscribe((occurences) => {
                // console.log(occurences)
                setTinitusData(occurences
                    .map( data => data._data)
                  );
                  
              });
      }

      return () => {
          if (subTinitus && subTinitus.unsubscribe) subTinitus.unsubscribe();
      };
  }, []);


    const getEventsForDay = (date) => {
        return events.filter((event) => event.date === date);
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
    };

    const getMarkedDates = () => {
      let markedDates = {};

      const dateArray = tinitusData.map(data => moment(data.dateTime).format("YYYY-MM-DD"));
      const frequency = frequencyDistribution(dateArray);

      frequency.forEach(element => {
        let selectedColor = '#FAD2E1';
        if(element.frequency <= 4) {
          selectedColor = '#ABC5FE';
        } else if(element.frequency <= 8) {
          selectedColor = '#BEE1E6';
        }

        markedDates[element.keyword] = {selected: true, marked: true, selectedColor: selectedColor};
      });
      
      return markedDates;
    }

    return (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.insightContainer}>
              <Text style={{fontSize: 16, fontWeight: "500", color: "#061428"}}>Insights</Text>
            </View>
            <View style={styles.noteCalendarContainer}>
                <Image source={require("../assets/circleicon.png")} style={styles.imageNote} />
                <View style={{flex:2}}>
                    <Text style={{fontSize: 12, fontWeight: "300", color: "#061428"}}>Circle colors indicate the number of occurrences of tinnitus episodes in a day</Text>
                </View>              
            </View>
            <View style={styles.calendarContainer}> 
                <CalendarList
                    style={{
                      borderColor: 'gray',
                      height: 600,
                    }}
                    pastScrollRange={24}
                    futureScrollRange={0}
                    markedDates={getMarkedDates()}
                    onDayPress={onDayPress} />
                {/* <Text style={{fontSize: 20, fontWeight: "400",}}>Month View</Text>            */}
            </View> 
  
            <View style={styles.graphscontainner}>
              {/* <ScrollView style={styles.scrollView}>
                <Text style={{ fontSize: 10 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud 
              </ScrollView> */}
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