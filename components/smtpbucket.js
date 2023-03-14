function sendEmail(to, subject, body) {
  fetch('http://13.112.173.206:3000/sendEmail', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      to: to,
      subject: subject,
      body: body,
    }),
  })
    .then(response => {
      if (response.ok) {
        console.log('Email sent successfully');
      } else {
        console.log('Failed to send email');
      }
    })
    .catch(error => console.log('Error:', error));
}

export default sendEmail;