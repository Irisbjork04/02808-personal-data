import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
import DayView from './DayView';
import WeekView from './WeekView';
import MonthView from './MonthView';


const UpperStack = createMaterialTopTabNavigator();



export default function TopStack() {
    return (
        <NavigationContainer>
            <UpperStack.Navigator
              initialRouteName="Day"
              screenOptions={{
                activeTintColor: '#42f44b',
            }}>
              <UpperStack.Screen name="Day" component={DayView} />
              <UpperStack.Screen name="Week" component={WeekView} />
              <UpperStack.Screen name="Month" component={MonthView} />
          </UpperStack.Navigator>
        </NavigationContainer>
      );
}