import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { clearSession } from '../components/sessionManager';

const SignedOutScreen = () => {
    clearSession();
  return (
    <View style={styles.container}>
      <Text>You are signed out.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignedOutScreen;
