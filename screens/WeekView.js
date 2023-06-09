import React, { Component, useState, useEffect, useContext } from 'react';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ImageBackground, Modal, Pressable, TouchableHighlight} from 'react-native';  
// import WeekView from 'react-native-week-view';
import Cloud from 'react-native-word-cloud';
import moment from 'moment'
import CircularProgress from 'react-native-circular-progress-indicator';
// import Notebook from '../notebook/BarChart';
import DBContext from '../LocalDB/DBContext';
import CurrentUserContext from '../LocalDB/CurrentUserContext';
import { TinitusCollectionName, SleepTimeCollectionName } from '../LocalDB/LocalDb';
import { frequencyDistribution, remove_stopwords, randomColorWithout } from './helper/frequency';

const WeekView = ({ navigation }) => {

    const [date, setDate] = useState(moment());
    const [isNextAvailable, setIsNextAvailable] = useState(false);
    const [tinitusData, setTinitusData] = useState([]);
    const [sleepTimeData, setSleepTimeData] = useState([]);
    const [wordCloudData, setWordCloudData] = useState([]);
    const { db } = useContext(DBContext);
    const { userCredentials } = useContext(CurrentUserContext);

    useEffect(() => {
        let subTinitus, subSleepTime;
        if (db &&  db[TinitusCollectionName]) {
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
                    .filter( data => moment(data._data.dateTime).isSame(date, 'week'))
                    .map( data => data._data)
                    );
                    
                });
        }

        if (db &&  db[SleepTimeCollectionName]) {
          subSleepTime = db[SleepTimeCollectionName]
                .find({
                  selector: {
                    userId: userCredentials.email
                  }
                })
                .sort({ endDateTime: 1 })
                .$.subscribe((sleepTimes) => {
                  // console.log(sleepTimes)
                  setSleepTimeData(sleepTimes
                    .filter( data => moment(data._data.endDateTime).isSame(date, 'week'))
                    .map( data => data._data)
                    );
                });
        }

        return () => {
            if (subTinitus && subTinitus.unsubscribe) subTinitus.unsubscribe();
            if (subSleepTime && subSleepTime.unsubscribe) subSleepTime.unsubscribe();
        };
    }, [date]);



    useEffect(() => {
      setWordCloudData(GenerateWordCloudData());
    }, [tinitusData]);

    const nextWeek = () => {
      const newDate = date.clone().add(1, 'week');
      setIsNextAvailable(newDate.week() != moment().week());
      setDate(newDate);
    };

    const prevWeek = () => {
      const newDate = date.clone().subtract(1, 'week');
      setIsNextAvailable(newDate.week() != moment().week());
      setDate(newDate);
    };
    
    const selectedWeek = () => {
      return {
        startDate: date.clone().startOf('week'),
        endDate: date.clone().endOf('week')
      }
    };

    const displayWeek = () => {
      let week = selectedWeek();
      return week.startDate.format("MMMM D ") + "-" +week.endDate.format("D YYYY");
    };
    
    const nextArrow = () => {
      if(isNextAvailable) {
        return (
          <TouchableOpacity  onPress={nextWeek} >
              <Image source={require("../assets/rightArrowActive.png")} style={styles.image}/>  
          </TouchableOpacity> 
        );
      }else {
        return (
          <Image source={require("../assets/arrowInactive.png")} style={styles.image}/>  
        )
      }
    };

    const MyBarchartData = () => {
      let data = [0,0,0,0,0,0,0];

      tinitusData
        .forEach( d => {
          let day = moment(d.dateTime).weekday();
          data[day] = data[day] + 1;
        });
      
      return data;
    };

    const MyProgressChart = () => {
      let totalSleepTime = sleepTimeData.reduce((acc, data) => {
        return acc + moment(data.endDateTime).diff(moment(data.startDateTime)); 
      }, 0) / (1000 * 60 * 60);
      
      // console.log("weekview: isoweekday: " + moment().weekday() + " totalSleepTime: " + totalSleepTime );

      // If current week, calculate average sleep time per day
      if(moment(date).isSame(new Date(), 'week')) {
        let days = moment().weekday();

        sleepTimeData.filter( data => moment(data.endDateTime).isSame(moment(), 'day')).length > 0 ? days++ : days;

        if(days == 0) {
          days = 1;
        }

        totalSleepTime = totalSleepTime / days;
        
      } else {
        totalSleepTime = totalSleepTime / 7; // Average sleep time per day
      }
      
      totalSleepTime = Math.trunc(totalSleepTime); // Remove decimal part

      return (
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <View style={{flexDirection:"row", alignItems: "center", justifyContent: "center", marginBottom: 16}}>
            <Image source={require("../assets/sleep.png")} style={styles.image} />
            <Text style={{marginHorizontal: 8}}>Daily sleep goal 8 hrs</Text>
          </View>
          <CircularProgress
            value={totalSleepTime}
            // valuePrefix = 'Rs'
            valueSuffix = 'hrs'
            radius={80}
            maxValue={12}
            duration={1000}
            title="Avg. Slept"
            titleStyle = {{fontSize: 20, fontWeight: "400", color: "#061428"}}
            inActiveStrokeOpacity={0.5}
            activeStrokeWidth={20}
            activeStrokeColor = '#165DFF'
            inActiveStrokeWidth={20}
            progressValueStyle={{ fontWeight: '100', color: '#061428', fontSize: 40 }}
          />
        </View>
      );
    };
    const MyBarChart = () => {
      return (
        <View>
          <View style={styles.chartTextLabel}>
            <Image source={require("../assets/barIcon.png")} style={styles.barImage} />
            <View style={{flex:2}}>
              <Text style={{fontSize: 12, fontWeight: "400", color: "#061428"}}>No. of Episode(s)</Text>
            </View>              
          </View>
          <BarChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
              datasets: [
                {
                  data: MyBarchartData(),
                },
              ],
            }}
            width={Dimensions.get('window').width - 16}
            height={220}
            yAxisLabel=""
            // yAxisLabel={'Rs'}
            withVerticalLabels = {true}
            withHorizontalLabels = {true}
            withInnerLines={true}
            fromZero={true}
            showValuesOnTopOfBars={true}
            showBarTops={true}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(139,0,0, ${opacity})`,
              barPercentage: .8,
              propsForVerticalLabels: { fontSize: 12, fontWeight: "300" },
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      );
    };

    const GenerateWordCloudData = () => {
      let text = tinitusData.map(data => data.notes).join(" ");
  
      let words = frequencyDistribution(remove_stopwords(text));
  
      // Add color to each word
      words = words.map(word => {
        return {...word, color: randomColorWithout("#000000")} 
      });
      return words;
    };

    return (
        <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.insightContainer}>
              <Text style={{fontSize: 16, fontWeight: "500", color: "#061428"}}>Insights</Text>
          </View>
            
          <View style={styles.calendarContainer}> 
            <TouchableOpacity  onPress={prevWeek} >
              <Image source={require("../assets/leftArrowActive.png")} style={styles.image}/>
            </TouchableOpacity>
                <Text style={{fontSize: 16, fontWeight: "400", color: "#555F72"}}>{displayWeek()}</Text>  
            {nextArrow()}                  
          </View> 

          <View style={styles.graphscontainner}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.circularProgressBarView}>
                <MyProgressChart />
              </View>
              <View style={styles.barView}>
                <MyBarChart/>
              </View>
              <View>
                <View style={{flex:4, flexDirection: "row", justifyContent:"flex-end", marginHorizontal:20, marginBottom: -35 }}>
                  <Image source={require("../assets/weekWordCloud.png")} style={styles.wordcloudImage} />
                </View>
                <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
                  <Cloud keywords={wordCloudData} scale={200} largestAtCenter={true} drawContainerCircle={false} containerCircleColor={'#ffffff'}/>
                </View>
              </View>
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
    image: {
      width: 22,
      height: 22,
      resizeMode: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
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
    circularProgressBarView: {
      marginHorizontal: 10,
      marginVertical: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    barView: {
      marginVertical: 15,
    },
    header: {
      fontSize: 16,
    },
    chartTextLabel: {
      flex: 2,      
      flexDirection: 'row',
      marginHorizontal: 10,
      marginVertical: 4,
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    barImage:{
      height: 20,
      width: 10,
      marginRight: 10,
    },
    wordCloudView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    wordcloudImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
    },
  });

export default WeekView;