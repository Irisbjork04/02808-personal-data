import React, { Component, useState, useEffect, useContext } from 'react';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, ScrollView, TouchableOpacity, ImageBackground, Modal, Pressable, TouchableHighlight} from 'react-native';  
// import WeekView from 'react-native-week-view';
import moment from 'moment'
import CircularProgress from 'react-native-circular-progress-indicator';
// import Notebook from '../notebook/BarChart';
import DBContext from '../LocalDB/DBContext';
import { TinitusCollectionName, SleepTimeCollectionName } from '../LocalDB/LocalDb';

const WeekView = ({ navigation }) => {

    const [date, setDate] = useState(moment());
    const [isNextAvailable, setIsNextAvailable] = useState(false);
    const [tinitusData, setTinitusData] = useState([]);
    const [sleepTimeData, setSleepTimeData] = useState([]);
    const { db } = useContext(DBContext);

    useEffect(() => {
        let subTinitus, subSleepTime;
        if (db && db[TinitusCollectionName]) {
          subTinitus = db[TinitusCollectionName]
                .find({
                  selector: {
                    userId: 1
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

        if (db && db[SleepTimeCollectionName]) {
          subSleepTime = db[SleepTimeCollectionName]
                .find({
                  selector: {
                    userId: 1
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
    }, [db,date]);

    useEffect(() => { // multiinstance replication is not working, so using this hack to update the data
      let dataFetcher = setInterval(() => {
        if(!db) {  
          return;
        }
        // TinitusData Fetcher
        let todayOccurences = [];
        db[TinitusCollectionName]
              .find({
                selector: {
                  userId: 1
                }
              })
              .sort({ dateTime: 1 })
              .exec()
              .then(occurences => {
                // console.log(occurences);
                todayOccurences = occurences.filter( data => moment(data._data.dateTime).isSame(date, 'week'))
                  .map( data => data._data);
              });

                    
  
        if(todayOccurences.length != tinitusData.length) {
          setTinitusData(todayOccurences);
        }

        // SleepTimeData Fetcher
        let todaySleepTimes = [];
        db[SleepTimeCollectionName]
            .find({
              selector: {
                userId: 1
              }
            })
            .sort({ endDateTime: 1 })
            .exec()
            .then(sleepTimes => {
              // console.log(sleepTimes);
              todaySleepTimes = sleepTimes.filter( data => moment(data._data.endDateTime).isSame(date, 'week'))
                .map( data => data._data);
            });

        if(todaySleepTimes.length != sleepTimeData.length) {
          setSleepTimeData(todaySleepTimes);
        }
      }, 60000);
  
      return () => {
        clearInterval(dataFetcher);
      };
    }, [db]);

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
          let day = moment(d.dateTime).isoWeekday();
          data[day-1] = data[day-1] + 1;
        });
      
      return data;
    };

    const MyProgressChart = () => {
      let totalSleepTime = sleepTimeData.reduce((acc, data) => {
        return acc + moment(data.endDateTime).diff(moment(data.startDateTime)); 
      }, 0) / (1000 * 60 * 60);
  
      totalSleepTime = Math.trunc(totalSleepTime); // Remove decimal part

      return (
        <View>
          <CircularProgress
            value={totalSleepTime}
            // valuePrefix = 'Rs'
            valueSuffix = 'hrs'
            radius={80}
            maxValue={8}
            duration={1000}
            title="Slept"
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
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            // showValuesOnTopOfBars={true}
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
  });

export default WeekView;