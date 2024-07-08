const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Employee = require('./models/Employees');


const dbUri = 'mongodb+srv://rrubyrana8:ruby7829@cluster0.x2j5pj0.mongodb.net/Employee';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected!'))
  .catch(err => {
    console.error('Database connection error:', err);
    process.exit(1); // Exit process with failure
  });

const seedData = async () => {
  try {
    const filePath = path.join(__dirname, 'db.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')).employees;
    console.log('Parsed data:', data); // Log parsed data

    // Check if data matches the schema
    if (!Array.isArray(data)) {
      throw new Error('Data is not an array');
    }
    data.forEach(employee => {
      if (!employee.name || !employee.email) {
        throw new Error(`Invalid data: ${JSON.stringify(employee)}`);
      }
    });

    await Employee.deleteMany({}); // Clear existing data
    const inserted = await Employee.insertMany(data);
    console.log(`Data successfully seeded! Inserted ${inserted.length} documents.`);
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1); // Exit process with failure
  }
};

seedData();