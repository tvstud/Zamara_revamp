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
      {continents.map(continent => (
        <View key={continent.code} style={styles.item}>
          <Text style={styles.code}>{continent.code}</Text>
          <Text style={styles.name}>{continent.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'black',
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
  code: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  name: {},
});

export default Continents;
