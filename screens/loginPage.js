import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { saveSession } from '../components/sessionManager';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("pressed!");
    try {
      const response = await fetch("https://dummyjson.com/users/1");
      const data = await response.json();
      if (data.id ===1) {
       console.log("function called!")
        setIsLoggedIn(true);
        setErrorMessage("");
        saveSession(data.id);
        // Navigate to the dashboard screen on successful login
        navigation.navigate('Dashboard', { userId: data.id });
      } else {
        setIsLoggedIn(false);
        setErrorMessage(data.message);
        console.log("else run!")
      }
    } catch (error) {
      console.error(error);
      console.log("error!");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/logo.png')}></Image>
      <Text style={styles.heading}>Please log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        placeholderStyle={{ color: 'white' }}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        placeholderStyle={{ color: 'white' }}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
    
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F3D',
  },
  heading: {
    fontSize: 30,
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    color: 'white',
    height: 50,
    width: '80%',
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  
  },
  button: {
    backgroundColor: '#43ae37',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default LoginPage;
