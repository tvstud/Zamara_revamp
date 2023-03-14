import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
//import soap from 'react-native-soap';

function Continents() {
  const [continents, setContinents] = useState([]);

  useEffect(() => {
    // create a SOAP client
    const client = new soap.Client({
      wsdl: 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL'
    });

    // call the ListOfContinentsByName operation
    client.call('ListOfContinentsByName', {}, (err, res) => {
      if (err) {
        console.error(err);
      } else {
        // extract the continents from the response
        const { tContinent } = res.ListOfContinentsByNameResult;

        // create an array of continent objects with code and name properties
        const continentList = tContinent.map(continent => ({
          code: continent.sCode,
          name: continent.sName
        }));

        // update the state with the list of continents
        setContinents(continentList);
      }
    });
  }, []);

  return (
    <View>
      {continents.map(continent => (
        <View key={continent.code}>
          <Text>{continent.code}</Text>
          <Text>{continent.name}</Text>
        </View>
      ))}
    </View>
  );
}


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
