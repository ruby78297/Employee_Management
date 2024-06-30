import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import SearchBar from './SearchBar';

const EmployeeTable = ({ employees, onDeleteEmployee }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleDelete = (id) => {
    setSelectedEmployeeId(id);
    setOpenDialog(true);
  };

 const handleConfirmDelete = () => {
  if (selectedEmployeeId) {
    onDeleteEmployee(selectedEmployeeId);
    setOpenDialog(false);
  }
};


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedEmployeeId(null);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollbarStyles = {
    maxHeight: '95vh',
    overflowY: 'scroll',
    border: '1px solid #004c4c',
    borderRadius: '1rem',
    scrollbarWidth: 'thin',
    scrollbarColor: '#004c4c transparent',
    WebkitOverflowScrolling: 'touch',
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#004c4c',
      borderRadius: '10px',
    },
  };

  const handleAddEmployee = () => {
    navigate('/add-new-employee');
  };

  return (
    <Container>
      <Box my={6}>
        <Box >
          <Grid container spacing={2}>
            <Grid item md={4} xs={12}>  <Typography variant="h4"  sx={{ color: '#004c4c', mb: 2 }}>
            Employee List
          </Typography></Grid>
            <Grid item md={6} xs={12} textAlign={"center"}>  <SearchBar onSearch={setSearchTerm} height={'3rem'} sWidth="70%" /></Grid>
            <Grid item md={2} xs={12} >    <Button
            variant='contained'
            sx={{ bgcolor: '#004c4c', height: '3rem' }}
            onClick={handleAddEmployee}
          >
            Add Employee
          </Button></Grid>
          </Grid>
        
        
       
        </Box>
        <Box m={6} sx={scrollbarStyles}>
          <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ fontWeight: 700 }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Salary</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phoneNumber}</TableCell>
                    <TableCell>
                      {employee.departments.map((dept, index) => (
                        <span key={index}>
                          {dept.title}
                          {index < employee.departments.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>{employee.address}</TableCell>
                    <TableCell>
                      <Link to={`/edit-employee/${employee.id}`}>
                        <IconButton
                          size='small'
                          sx={{
                            bgcolor: '#004c4c',
                            color: '#b2d8d8',
                            '&:hover': { bgcolor: '#004c4c' },
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Link>
                      <IconButton
                        onClick={() => handleDelete(employee.id)}
                        size='small'
                        sx={{
                          bgcolor: '#FFBFBF',
                          color: 'red',
                          marginLeft: { md: '1rem', xs: 0 },
                          mt: { md: 0, xs: 0.5 },
                          '&:hover': { bgcolor: '#FFBFBF' },
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to delete this employee?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeeTable;
