import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';  

//In react native we dont use raw html -> view is like <div
//This is platform independent (f.ex View -> UIView in iOS when we run it).
export default function App() {
  return (
    <View style={styles.container}> 
      <Text>what's up????</Text> 
      <StatusBar style="auto" />
    </View>
  );
}

//Creating the styles contain ment
const styles = StyleSheet.create({
  container: { // This is just a regular JavaScript property not CSS
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
