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
  padding: 20,
  backgroundColor: '#fff'
  },
  title: {
  fontSize: 24,
  fontWeight: 'bold',
  marginBottom: 20
  },
  form: {
  marginBottom: 20
  },
  input: {
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
  },
  button: {
  backgroundColor: '#007aff',
  padding: 10,
  borderRadius: 5
  },
  buttonText: {
  color: '#fff',
  textAlign: 'center',
  fontWeight: 'bold'
  },
  list: {
  flex: 1
  },
  listItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10
  },
  listItemLeft: {
  flexDirection: 'column'
  },
  listItemText: {
  fontSize: 18,
  marginBottom: 5
  },
  listItemRight: {
  backgroundColor: '#f00',
  padding: 10,
  borderRadius: 5
  },
  listItemDelete: {
  color: '#fff',
  fontWeight: 'bold'
  }
  });
export default Continents;
