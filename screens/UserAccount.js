import { StatusBar } from 'expo-status-bar'; //This is a component that we can use to show the status bar at the top of the screen
import { StyleSheet, Text, View, Image, SafeAreaView, Button, ImageBackground, TextInput, Pressable, TouchableHighlight, TouchableOpacity } from 'react-native';  //Importing the components we need
import {useState,useEffect } from 'react';



// UserAccount Login Screen with User Name and Email address input fields
export default function UserAccountScreen({showToast, setToastContent, setUserCredentials}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  const onFormSubmit = () => {
    console.log("Form submitted")

    // Regex chack not valid email address
    if (!email.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
      console.log("Not valid email address")
      return;
    }

    // Regex check not valid name
    if (!name.match(/^[a-zA-Z]+$/)) {
      console.log("Not valid name")
      return;
    }

    // Save user credentials to local storage
    const userCredentials = { name: name, email: email, userId: '123' };
    setUserCredentials(userCredentials);

    // ToDo: Load data from DB
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
          <Image source={require("../assets/timinusUse.png")} style={styles.upperImageContainer} />
          <View style={{flex:.1, flexDirection: "row", marginHorizontal:30, marginBottom:20}}>
            <Text style={{fontSize: 13, fontWeight: "300", color: "#061428", textAlign: "center"}}>We need the below information to remember you.
So that you can access your data anytime!!</Text>
          </View>
          <View style={styles.inputView}>
            <View style={{  justifyContent:"flex-start", marginHorizontal: 70, marginVertical: 8}}>
              <Text style={styles.labeltext}>Name</Text>
            </View>           
            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              placeholder="Enter your name"
            />
              
            <View style={{  justifyContent:"flex-start", marginHorizontal: 70, marginVertical: 8}}>
              <Text style={styles.labeltext}>Email</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Enter your email"
            />
            <View style={styles.buttondiv}>
              <Button title="Remember Me" color="#735BF2" onPress={onFormSubmit} />
            </View>
          </View>
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  formContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  upperImageContainer: {
    flex:.9,
    flexDirection: 'row',
  },
  inputView: {
    flex: 1,
  },
  input: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 1,
    backgroundColor: '#F6F4FA',
    borderBottomColor: '#8348EF',
    padding: 8,
    // margin: -4,
    // width: 100,
    marginHorizontal: 60,
    fontSize: 16,
  },
  labeltext: {
    color: '#2A1342',
    fontSize: 12,
    fontWeight: '400',    
  },
  buttondiv: {
    flex:2,
    flexDirection: 'column',
    marginHorizontal: 60,
    marginVertical: 40,
  },
});