import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [staffNumber, setStaffNumber] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [staffDepartment, setStaffDepartment] = useState('');
  const [staffSalary, setStaffSalary] = useState('');

  useEffect(() => {
    fetch('https://crudcrud.com/api/2ba76d9e07ba4362971b0980796d931f/zamara')
      .then((response) => response.json())
      .then((data) => setStaffList(data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreateStaff = () => {
    const newStaff = {
      staffNumber,
      staffName,
      staffEmail,
      staffDepartment,
      staffSalary
    };

    fetch('https://crudcrud.com/api/2ba76d9e07ba4362971b0980796d931f/zamara', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newStaff)
    })
      .then((response) => response.json())
      .then((data) => {
        setStaffList([...staffList, data]);
        setStaffNumber('');
        setStaffName('');
        setStaffEmail('');
        setStaffDepartment('');
        setStaffSalary('');
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteStaff = (staffId) => {
    fetch(`https://crudcrud.com/api/2ba76d9e07ba4362971b0980796d931f/zamara/${staffId}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedStaffList = staffList.filter((staff) => staff._id !== staffId);
        setStaffList(updatedStaffList);
      })
      .catch((error) => console.error(error));
  };

  const renderItem = ({ item }) => (
    

  <View style={styles.listItem}>
  <View style={styles.itemContainer}>
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Staff Number:</Text>
      <Text style={styles.label}>Staff Name:</Text>
      <Text style={styles.label}>Staff Email:</Text>
      <Text style={styles.label}>Staff Department:</Text>
      <Text style={styles.label}>Staff Salary:</Text>
    </View>
    <View style={styles.valueContainer}>
      <Text style={styles.value}>{item.staffNumber}</Text>
      <Text style={styles.value}>{item.staffName}</Text>
      <Text style={styles.value}>{item.staffEmail}</Text>
      <Text style={styles.value}>{item.staffDepartment}</Text>
      <Text style={styles.value}>{item.staffSalary}</Text>
    </View>
  </View>
      <TouchableOpacity style={styles.listItemRight} onPress={() => handleDeleteStaff(item._id)}>
        <Text style={styles.listItemDelete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zamara Staff List</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Staff Number"
          placeholderTextColor= '#999'
          onChangeText={(text) => setStaffNumber(text)}
          value={staffNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Staff Name"
          placeholderTextColor= '#999'
          onChangeText={(text) => setStaffName(text)}
          value={staffName}
        />
        <TextInput
          style={styles.input}
          placeholder="Staff Email"
          placeholderTextColor= '#999'
          onChangeText={(text) => setStaffEmail(text)}
          value={staffEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          placeholderTextColor= '#999'
          onChangeText={(text) => setStaffDepartment(text)}
          value={staffDepartment}
        />
         <TextInput
          style={styles.input}
          placeholder="Salary"
          placeholderTextColor= '#999'
          onChangeText={(text) => setStaffSalary(text)}
          value={staffSalary}
        />
        <TouchableOpacity style={styles.button} onPress={handleCreateStaff}>
          <Text style={styles.buttonText}>Add Staff</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={staffList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={() => <Text>No user details found.</Text>}
      />
    </View>
  );
};
const styles = StyleSheet.create({
container: {
flex: 1,
padding: 20,
},
title: {
fontSize: 24,
fontWeight: 'bold',
marginBottom: 20,
color: '#000'
},
form: {
marginBottom: 20
},
input: {
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,

marginBottom: 10,
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
  color: '#777',
  marginBottom: 5,
},
listItemDelete: {
color: 'red',
fontWeight: 'bold'
}
});

export default Staff;






