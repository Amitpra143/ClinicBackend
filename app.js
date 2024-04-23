const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Sample data for doctors
const doctors = [
  { id: 1, name: 'Dr. John Doe', maxPatientsPerDay: 10 },
  { id: 2, name: 'Dr. Jane Smith', maxPatientsPerDay: 15 }
];

// Sample data for appointments
let appointments = [];

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Doctors Listing Endpoint
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// Doctor Detail Endpoint
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  res.json(doctor);
});

// Availability Endpoint
app.get('/api/doctors/:id/availability', (req, res) => {
  // Here you can implement logic to determine available time slots
  const availableSlots = ['5:00 PM', '6:00 PM', '7:00 PM']; // Sample data
  res.json(availableSlots);
});

// Appointment Booking Endpoint
app.post('/api/appointments/book', (req, res) => {
  console.log(req.body)
  const { doctorId, date, time, patientName } = req.body;
  const doctor = doctors.find(d => d.id === parseInt(doctorId));
  if (!doctor) {
    return res.status(404).json({ message: 'Doctor not found' });
  }
  if (appointments.filter(a => a.date === date && a.doctorId === doctorId).length >= doctor.maxPatientsPerDay) {
    return res.status(400).json({ message: 'Doctor is fully booked for the day' });
  }
  appointments.push({ doctorId, date, time, patientName });
  res.status(201).json({ message: 'Appointment booked successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

