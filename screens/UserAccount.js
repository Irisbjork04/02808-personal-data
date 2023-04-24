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
      <Text style={styles.title}>User Account</Text>
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Enter your email"
      />
      <Button title="Submit" onPress={onFormSubmit} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 200,
  },
});