import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { loadSession } from './sessionManager';

const Dashboard = ({ route }) => {
  const [userDetails, setUserDetails] = useState([]);
  // const { userId } = loadSession();
  const { userId }=route.params;
console.log(userId);
  useEffect(() => {
    fetch(`https://dummyjson.com/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserDetails([
          { title: 'First Name', value: data.firstName },
          { title: 'Last Name', value: data.lastName },
          { title: 'Age', value: data.age },
          { title: 'Gender', value: data.gender },
          { title: 'Email', value: data.email },
          { title: 'Phone', value: data.phone },
          { title: 'Birth Date', value: data.birthDate },
          { title: 'Blood Group', value: data.bloodGroup },
          { title: 'Height', value: data.height },
          { title: 'Weight', value: data.weight },
          { title: 'Eye Color', value: data.eyeColor },
          {
            title: 'Address',
            value: `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.postalCode}`,
          },
        ]);
      })
      .catch(error => console.error(error));
  }, [userId]);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
    <Text style={styles.label}>{item.title}</Text>
    <Text style={styles.value}>{item.value}</Text>
  </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome {userDetails[0]?.value} {userDetails[1]?.value}</Text>
      <Text >Your Profile details are as below:</Text>
      <FlatList
        data={userDetails}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListEmptyComponent={() => <Text>No user details found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },

  heading: {
    fontSize: 30,
    marginBottom: 20,
    marginLeft: 20,
    color: '#000',
  },

  });
export default Dashboard;
