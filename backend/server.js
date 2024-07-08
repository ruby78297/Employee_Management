const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const dbUri = 'mongodb+srv://rrubyrana8:ruby7829@cluster0.x2j5pj0.mongodb.net/Employee';

mongoose.connect(dbUri)
  .then(() => console.log('Database connected!'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); 
  });

app.use(cors());
app.use(bodyParser.json());

app.use('/api/employees', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
