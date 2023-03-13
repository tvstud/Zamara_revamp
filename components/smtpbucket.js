import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const SMTPBucket = () => {
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendEmail = async () => {
    const url = `https://api.smtpbucket.com/emails?sender=${sender}&recipients=${recipient}&subject=${subject}&body=${body}`;
    const response = await fetch(url, { method: 'POST' });
    const result = await response.json();
    console.log(result);
  };

  return (
    <View>
      <Text>Send Email</Text>
      <TextInput
        placeholder="Sender"
        value={sender}
        onChangeText={setSender}
      />
      <TextInput
        placeholder="Recipient"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        placeholder="Subject"
        value={subject}
        onChangeText={setSubject}
      />
      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
      />
      <Button title="Send" onPress={sendEmail} />
    </View>
  );
};

export default SMTPBucket;
