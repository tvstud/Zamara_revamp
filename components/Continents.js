import React, { useState, useEffect } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import soap from 'react-native-soap-request';
import Menu from './menu';


const Continents = () => {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
    const method = 'ListOfContinentsByName';
    const args = {};
    
    const getContinents = async () => {
      try {
        const client = await soap.createClient({wsdl: url});
        const result = await client.ListOfContinentsByName(args);
        const continentList = result.ListOfContinentsByNameResult.tContinent.map((continent) => ({
          code: continent.sCode,
          name: continent.sName,
        }));
        setContinents(continentList);
      } catch (error) {
        console.error(error);
      }
    };
    getContinents();
  }, []);

  return (
    <View style={styles.container}>
      <Text>List of Continents</Text>
      {continents.map((continent) => (
        <View key={continent.code}>
          <Text>{continent.code}</Text>
          <Text>{continent.name}</Text>
        </View>
      ))}
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
  fontSize: 16,
  fontWeight: 'bold',
  color: '#333',
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
listItemDelete: {
color: 'red',
fontWeight: 'bold'
}
});
export default Continents;
