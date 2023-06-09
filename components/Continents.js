import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { parseString } from 'react-native-xml2js';

const CountryInfoServiceURL = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso';

const Continents = () => {
  const [continents, setContinents] = useState([]);

  const fetchContinents = async () => {
    try {
      const soapRequest = `
        <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:web="http://www.oorsprong.org/websamples.countryinfo">
          <soap:Header/>
          <soap:Body>
            <web:ListOfContinentsByName/>
          </soap:Body>
        </soap:Envelope>
      `;

      const response = await axios.post(CountryInfoServiceURL, soapRequest, {
        headers: {
          'Content-Type': 'application/soap+xml;charset=UTF-8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept': 'application/soap+xml, application/x-www-form-urlencoded, */*',
        },
      });

      // Convert the XML response to a JavaScript object
      const responseObj = await new Promise((resolve, reject) => {
        parseString(response.data, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      // Extract the list of continents from the response object
      const continentList = responseObj['soap:Envelope']['soap:Body'][0]['m:ListOfContinentsByNameResponse'][0]['m:ListOfContinentsByNameResult'][0]['m:tContinent'];

      // Map the continent data to an array of objects with 'code' and 'name' properties
      const continents = continentList.map(continent => ({
        code: continent['m:sCode'][0],
        name: continent['m:sName'][0],
      }));

      // Set the state to the list of continents
      setContinents(continents);
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchContinents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Continents</Text>
      {continents.map(continent => (
        <View key={continent.code} style={styles.item}>
          <Text style={styles.code}>{continent.code}</Text>
          <Text style={styles.code}>{continent.name}</Text>
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

export default Continents;
