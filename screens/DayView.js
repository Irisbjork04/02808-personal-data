import React, { Component, useState, useEffect } from 'react';
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, ScrollView, ImageBackground, Modal, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native'; 
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import CircularProgress from 'react-native-circular-progress-indicator';
import moment from 'moment';


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
    return (
      <View>
        <CircularProgress
          value={6}
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
            labels: ['12AM', '4AM', '8AM', '12PM', '4PM', '8PM', '12PM'],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={Dimensions.get('window').width - 20}
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
    // chart: {
    //   marginBottom: 30,
    //   padding: 10,
    //   paddingTop: 20,
    //   borderRadius: 20,
    //   backgroundColor: 'green',
    //   width: 375
    // }
  });

export default DayView;