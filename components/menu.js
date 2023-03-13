import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loadSession } from './sessionManager';

const FoldableMenu = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePress = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.container}>
          {children}
        </View>
      )}
    </View>
  );
};

const Menu = () => {
  loadSession();
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Dashboard');
  };

  const handleStaffPress = () => {
    navigation.navigate('Staff');
  };

  const handleContinentsPress = () => {
    navigation.navigate('Continents');
  };

  const handleSignOutPress = () => {
    navigation.navigate('SignedOutScreen');
  };

  return (
    <View>
      <FoldableMenu title="| | |">
        <TouchableOpacity style={styles.button} onPress={handleHomePress}>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleStaffPress}>
          <Text style={styles.text}>Staff</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleContinentsPress}>
          <Text style={styles.text}>Continents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSignOutPress}>
          <Text style={styles.text}>Sign Out</Text>
        </TouchableOpacity>
      </FoldableMenu>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F1F3D',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default Menu;
