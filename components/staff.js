import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity,Button, ScrollView } from 'react-native';
import sendEmail from './smtpbucket';
const API_BASE_URL = 'https://crudcrud.com/api/c577eb32d32d4eeaa402c4451de1d81a/zamara'
const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [staffNumber, setStaffNumber] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('tujatj@gmail.com');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');
  const [buttonText, setButtonText] = useState('Add Staff');
  function MyButton() {
      setButtonText('Update Staff');
    };
  useEffect(() => {
    fetchStaffList();
  }, []);

  const fetchStaffList = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      const data = await response.json();
      setStaffList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const createStaff = () => {
    const newStaff = {
      staffNumber,
      staffName,
      staffEmail,
      department,
      salary
    };

    fetch(API_BASE_URL, {
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
        setDepartment('');
        setSalary('');
      const subject = "Profile Notification #Created";
      const body = `Greetings ${data.staffName}, we are glad to inform you that your staff profile has been created.`;
      sendEmail(data.staffEmail, subject, body);
    
      })
      .catch((error) => console.error(error));
  };

  const deleteStaff = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const filteredList = staffList.filter((staff) => staff._id !== id);
      setStaffList(filteredList);
      const subject = "Profile Notification #Deleted";
      const body = `Greetings ${staffName}, we are glad to inform you that your staff profile has been deleted.`;
      sendEmail(staffEmail, subject, body);
    } catch (error) {
      console.error(error);
    }
  };
  const updateStaff = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          staffNumber,
          staffName,
          staffEmail,
          department,
          salary,
        
        }),
      });
      const data = await response.json();
      const updatedList = staffList.map((staff) =>
        staff._id === id ? data : staff
      );
      setStaffList(updatedList);
      const subject = "Profile Notification #Edited";
      const body = `Greeting ${staffName}, we are glad to inform you that your staff profile has been updated.`;
      sendEmail(staffEmail, subject, body);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Zamara Staff List</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Staff Number"
          placeholderTextColor="white"
          placeholderStyle={{ color: 'white' }}
          onChangeText={(text) => setStaffNumber(text)}
          value={staffNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Staff Name"
          placeholderTextColor="white"
          placeholderStyle={{ color: 'white' }}
          onChangeText={(text) => setStaffName(text)}
          value={staffName}
        />
        <TextInput
          style={styles.input}
          placeholder="Staff Email"
          placeholderTextColor="white"
          placeholderStyle={{ color: 'white' }}
          onChangeText={(text) => setStaffEmail(text)}
          value={staffEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Department"
          placeholderTextColor="white"
          placeholderStyle={{ color: 'white' }}
          onChangeText={(text) => setDepartment(text)}
          value={department}
        />
         <TextInput
          style={styles.input}
          placeholder="Salary"
          placeholderTextColor="white"
          placeholderStyle={{ color: 'white' }}
          onChangeText={(text) => setSalary(text)}
          value={salary}
        />
        <TouchableOpacity style={styles.button} onPress={createStaff}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
  
      </View>
      <ScrollView>
        <Text style={styles.listTitle}>Existing Staff</Text>
      {staffList.map((staff) => [
    <View key={staff._id}>
      <Text style={styles.listItem}>Staff Number: {staff.staffNumber}</Text>
        <Text style={styles.listItem}>Staff Name : {staff.staffName}</Text>
        <Text style={styles.listItem}>Staff Email : {staff.staffEmail}</Text>
        <Text style={styles.listItem}>Department : {staff.department}</Text>
        <Text style={styles.listItem}>Salary : {staff.salary}</Text>
        <Button
            title="Edit"
            style={styles.button}
            onPress={() => {
                setStaffNumber(staff.staffNumber);
                setStaffName(staff.staffName);
                setStaffEmail(staff.staffEmail);
                setDepartment(staff.department);
                setSalary(staff.salary);
                updateStaff(staff._id);
                MyButton();
                deleteStaff(staff._id);
            }}
        />
        <Button title="Delete" style={styles.button} onPress={() => deleteStaff(staff._id)} />
    </View>,
])
}
</ScrollView>
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
listTitle: {
  fontSize: 20,
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

export default Staff;






