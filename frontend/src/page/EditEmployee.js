import React, { Fragment, useState, useEffect } from "react";
import Header from "../assets/Header";
import Footer from "../assets/Footer";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
    Typography,
  Snackbar
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployee } from "../store/actions/employeeActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const departments = [
  { title: "HR" },
  { title: "Engineering" },
  { title: "Sales" },
  { title: "Marketing" },
];

const states = [
  'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'West Bengal', 
  'Telangana', 'Gujarat', 'Rajasthan', 'Uttar Pradesh'
];

const EditEmployee = () => {
  const  {employeeId}  = useParams(); 
  console.log("emp", employeeId)
 

  const dispatch = useDispatch();
  const { loading, error, employees } = useSelector(state => state.employee);
 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    state: "",
    salary: "",
    departments: [],
  });

  const [errors, setErrors] = useState({});

 
  useEffect(() => {
  
    const employee = employees.find(emp => emp._id === employeeId);
 
    if (employee) {
      setFormData({
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
        address: employee.address,
        state: employee.state, 
        salary: employee.salary,
        departments: employee.departments,
      });
    }
  }, [employeeId, employees]);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAutocompleteChange = (event, value) => {
    setFormData({ ...formData, departments: value });
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = /^[a-zA-Z\s]+$/.test(formData.name) ? "" : "Name must contain only letters and spaces";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ? ""
      : "Email is not valid";
    tempErrors.phoneNumber = formData.phoneNumber.length === 10
      ? ""
      : "Phone number must be 10 digits";
    tempErrors.address = formData.address ? "" : "Address is required";
    tempErrors.salary = formData.salary ? "" : "Salary is required";
    tempErrors.departments =
      formData.departments.length > 0 ? "" : "At least one department is required";
    tempErrors.state = formData.state ? "" : "State is required";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };


  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await dispatch(updateEmployee(employeeId, formData));

        toast.success('Employee updated successfully');
        navigate('/');
       
      } catch (error) {
          
           toast.error('Failed to update employee');
      }
    }
  };

  return (
    <Fragment>
      <Header />
      <Container>
        
        <Box
          my={8}
          mx={{ md: "20%", xs: "1%" }}
          sx={{
            boxShadow: 3,
            padding: 4,
            borderRadius: 2,
            background: "#b2d8d8",
          }}
        >
          <Typography my={3} textAlign={"center"} variant="h4">
            Edit Employee Information
          </Typography>
          <form onSubmit={onSubmit}>
            <Typography>Name</Typography>
            <TextField
              name="name"
              label="Name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <Typography mt={2}>Email</Typography>
            <TextField
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Typography mt={2}>Phone Number</Typography>
            <TextField
              name="phoneNumber"
              label="Phone Number"
              fullWidth
              margin="normal"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              inputProps={{ maxLength: 10 }}
            />
            <Typography mt={2}>Address</Typography>
            <TextField
              name="address"
              label="Address"
              fullWidth
              margin="normal"
              multiline
              value={formData.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <Typography mt={2}>State</Typography>
            <TextField
              select
              name="state"
              label="Select State"
              fullWidth
              margin="normal"
              value={formData.state} 
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
            >
              {states.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
            <Typography mt={2}>Salary</Typography>
            <TextField
              name="salary"
              label="Salary"
              fullWidth
              margin="normal"
              value={formData.salary}
              onChange={handleChange}
              error={!!errors.salary}
              helperText={errors.salary}
            />
            <Typography mt={2}>Department</Typography>
            <Autocomplete
              multiple
              id="department-autocomplete"
              options={departments}
              value={formData.departments}
              onChange={handleAutocompleteChange}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="departments"
                  label="Department"
                  fullWidth
                  margin="normal"
                  error={!!errors.departments}
                  helperText={errors.departments}
                />
              )}
            />
            <Box my={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ bgcolor: "#004c4c" }}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
          <Footer />
          <ToastContainer position="top-right" />
    </Fragment>
  );
};

export default EditEmployee;
