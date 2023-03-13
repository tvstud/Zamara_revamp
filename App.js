import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './screens/loginPage';
import signedoutScreen from './screens/signedoutScreen';
import Dashboard from './components/dashboard';
import Menu from './components/menu';
import Continents from './components/Continents';
// import Staff from './components/staff';
import Staff from './components/staff2';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{
    headerStyle: {
      backgroundColor: '#1F1F3D',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold', 
    },
  }}>
        <Stack.Screen name="Login | Zamara -Powering Prosperity" component={LoginPage} />
        <Stack.Screen name="SignedOutScreen| Zamara -Powering Prosperity" component={signedoutScreen} options={{
          headerLeft: null, 
        }}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{
          headerLeft: () => (
            <TouchableOpacity>
              <Menu />
            </TouchableOpacity>
          ),
        }} />
        <Stack.Screen name="Continents" component={Continents} options={{
          headerLeft: () => (
            <TouchableOpacity>
            <Menu />
          </TouchableOpacity>
          ),
        }}/>
        <Stack.Screen name="Staff" component={Staff} options={{
          headerLeft: () => (
            <TouchableOpacity>
            <Menu />
          </TouchableOpacity>
            
          ),
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
