const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  title: { type: String, required: true }
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  departments: [departmentSchema],
  salary: { type: Number, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);
