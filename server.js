const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const arr=[]
// Parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Your route handlers
app.post('/your/route', (req, res) => {
  const { doctorId } = req.body; // Destructure doctorId from req.body
  // Your logic here
  arr.push(req.body)
  res.json({ message: 'Appointment booked successfully' });
});

app.listen(3001, () => {
  console.log('Server is running on port 4000');
});
