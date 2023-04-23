import React, { Component, useState, useEffect, useContext } from 'react';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'; 
import Cloud from 'react-native-word-cloud';
import CircularProgress from 'react-native-circular-progress-indicator';
import moment from 'moment';
import DBContext from '../LocalDB/DBContext';
import { TinitusCollectionName, SleepTimeCollectionName } from '../LocalDB/LocalDb';
import { frequencyDistribution, remove_stopwords, randomColorWithout } from './helper/frequency';


const DayView = ({ navigation }) => {

  const [date, setDate] = useState(moment());
  const [isNextAvailable, setIsNextAvailable] = useState(false);
  const [tinitusData, setTinitusData] = useState([]);
  const [sleepTimeData, setSleepTimeData] = useState([]);
  const [wordCloudData, setWordCloudData] = useState([]);
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
                  .filter( data => moment(data._data.dateTime).isSame(date, 'day'))
                  .map( data => data._data)
                  );
                  
              });
      }

      if (db && db[SleepTimeCollectionName]) {
        subTinitus = db[SleepTimeCollectionName]
              .find({
                selector: {
                  userId: 1
                }
              })
              .sort({ endDateTime: 1 })
              .$.subscribe((occurences) => {
                // console.log(occurences)
                setSleepTimeData(occurences
                  .filter( data => moment(data._data.endDateTime).isSame(date, 'day'))
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
    console.log("called with DB value:"+db);
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
                    // console.log(occurences)
                    todayOccurences = occurences
                    .filter( data => moment(data._data.dateTime).isSame(date, 'day'))
                    .map( data => data._data);
                  });

      if(todayOccurences.length != tinitusData.length) {
        setTinitusData(todayOccurences);
      }

      // SleepTimeData Fetcher
      let todaySleepTimeOccurences = [];
      let sleepTimeOccurences = db[SleepTimeCollectionName]
                  .find({
                    selector: {
                      userId: 1
                    }
                  })
                  .sort({ endDateTime: 1 })
                  .exec()
                  .then(occurences => {
                    // console.log(occurences)
                    todaySleepTimeOccurences = occurences
                    .filter( data => moment(data._data.endDateTime).isSame(date, 'day'))
                    .map( data => data._data);
                  });

      if(todaySleepTimeOccurences.length != sleepTimeData.length) {
        setSleepTimeData(todaySleepTimeOccurences);
      }
    }, 60000);

    return () => {
      clearInterval(dataFetcher);
    };
  }, [db]);

  useEffect(() => {
    setWordCloudData(GenerateWordCloudData());
  }, [tinitusData]);

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
  };
  
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


  const MyBarchartData = () => {
    return {
      onlyUnique: (value, index, self) => {
        return self.indexOf(value) === index;
      },
      labels: function() {
        return tinitusData
                .map(data => moment(data.dateTime).format('hA'))
                .filter(this.onlyUnique);
        // return ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];
      },
      data: function() {
        return this.labels().map(label => {
            return tinitusData
                    .filter(data => moment(data.dateTime).format('hA') == label)
                    .length;
          });
      }
    };
  };
  const MyBarChart = () => {
    let labels = MyBarchartData().labels();
    let data = MyBarchartData().data();
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
            labels: labels,
            datasets: [
              {
                data: data,
              },
            ],
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          yAxisLabel=""
          verticalLabelRotation={0}
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

  const GenerateWordCloudData = () => {
    let text = tinitusData.map(data => data.notes).join(" ");

    let words = frequencyDistribution(remove_stopwords(text));

    // Add color to each word
    words = words.map(word => {
      return {...word, color: randomColorWithout("#000000")} 
    });
    return words;
  };

  // const words = [
  //   {
  //     keyword: "severe headache",    // the actual keyword
  //     frequency: 1,      // the frequency of this keyword
  //     color: "#F2D7D5"     // the color of the circle that shows this keyword
  //   },
  //   {
  //     keyword: "buzzing",    // the actual keyword
  //     frequency: 1,      // the frequency of this keyword
  //     color: "#F5EEF8"     // the color of the circle that shows this keyword
  //   },
  //   {
  //     keyword: "fever",    // the actual keyword
  //     frequency: 1,      // the frequency of this keyword
  //     color: "#EAF2F8"     // the color of the circle that shows this keyword
  //   },
  //   {
  //     keyword: "headache",    // the actual keyword
  //     frequency: 1,      // the frequency of this keyword
  //     color: "#E8F8F5 ",     // the color of the circle that shows this keyword
  //   },
  // ];

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
            <View style={styles.circularProgressBarView}>
              <MyProgressChart />
            </View>
            <View style={styles.barView}>
              <MyBarChart/>
            </View>
            <View>
              <View style={{flex:4, flexDirection: "row", justifyContent:"flex-end", marginHorizontal:20, marginBottom: -35 }}>
                <Image source={require("../assets/dayWordCloud.png")} style={styles.wordcloudImage} />
              </View>
              <View style={{flex:1, justifyContent:"center", alignItems: "center"}}>
                <Cloud keywords={wordCloudData} scale={500} largestAtCenter={true} drawContainerCircle={false} containerCircleColor={'#ffffff'}/>
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
      justifyContent: 'center',
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
    wordCloudView: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    wordcloudImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
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

export default DayView;