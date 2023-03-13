import AsyncStorage from '@react-native-async-storage/async-storage';

const saveSession = async (sessionData) => {
  try {
    await AsyncStorage.setItem('session', JSON.stringify(sessionData));
  } catch (error) {
    console.error(error);
  }
};

const loadSession = async () => {
  try {
    const sessionData = await AsyncStorage.getItem('session');
    return JSON.parse(sessionData);
  } catch (error) {
    console.error(error);
  }
};

const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('session');
  } catch (error) {
    console.error(error);
  }
};

export { saveSession, loadSession, clearSession };
