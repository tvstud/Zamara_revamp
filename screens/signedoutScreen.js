import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { clearSession } from '../components/sessionManager';
import { useNavigation } from '@react-navigation/native';

const SignedOutScreen = () => {
  const navigation = useNavigation();

  const gotoLogin = () => {
    clearSession();
    navigation.navigate('myZamara');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')}></Image>
      <Text style={styles.label}>You are signed out.</Text>
      <TouchableOpacity style={styles.button} onPress={gotoLogin}>
        <Text style={styles.buttonText}>Go Back To Login Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F3D',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
color: '#fff'
},
form: {
marginBottom: 20
},
input: {
  color: '#fff',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,

marginBottom: 10,
},
item: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
  padding: 5,
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
textAlign: 'center',
fontWeight: 'bold'
},
listItem: {
  backgroundColor: '#fff',
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 1,
  elevation: 1,
},
itemContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
labelContainer: {
  flex: 1,
},
valueContainer: {
  flex: 2,
},
label: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 5,
},
value: {
  fontSize: 16,
  color: '#333',
  marginBottom: 5,
},
listItemText: {
  fontSize: 14,
  color: '#fff',
  marginBottom: 5,
},
code: {
  fontSize: 14,
  color: '#fff',
  marginBottom: 5,
  fontWeight: 'bold',
  marginRight: 10,
},
listItemDelete: {
color: 'red',
fontWeight: 'bold'
}
});

export default SignedOutScreen;
