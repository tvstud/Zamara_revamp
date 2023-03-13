import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const API_BASE_URL = 'https://crudcrud.com/api/c4ced4df1d764be0907bae4277832c63/zamara'

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [staffNumber, setStaffNumber] = useState('');
  const [staffName, setStaffName] = useState('');
  const [staffEmail, setStaffEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');

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
      })
      .catch((error) => console.error(error));
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
    } catch (error) {
      console.error(error);
    }
  };

  const deleteStaff = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      const filteredList = staffList.filter((staff) => staff._id !== id);
      setStaffList(filteredList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>Staff Number</Text>
      <TextInput value={staffNumber} onChangeText={setStaffNumber} />
      <Text>Staff Name</Text>
      <TextInput value={staffName} onChangeText={setStaffName} />
      <Text>Staff Email</Text>
      <TextInput value={staffEmail} onChangeText={setStaffEmail} />
      <Text>Department</Text>
      <TextInput value={department} onChangeText={setDepartment} />
      <Text>Salary</Text>
      <TextInput value={salary} onChangeText={setSalary} />
      <Button title="Create" onPress={createStaff} />



      {staffList.map((staff) => [
    <View key={staff._id}>
        <Text>{staff.staffNumber}</Text>
        <Text>{staff.staffName}</Text>
        <Text>{staff.staffEmail}</Text>
        <Text>{staff.department}</Text>
        <Text>{staff.salary}</Text>
        <Button
            title="Edit"
            onPress={() => {
                setStaffNumber(staff.staffNumber);
                setStaffName(staff.staffName);
                setStaffEmail(staff.staffEmail);
                setDepartment(staff.department);
                setSalary(staff.salary);
                updateStaff(staff._id);
            }}
        />
        <Button title="Delete" onPress={() => deleteStaff(staff._id)} />
    </View>,
])
}
                </View>
                );
                };
                
                export default Staff;
            
                
                
                
                
                
                
