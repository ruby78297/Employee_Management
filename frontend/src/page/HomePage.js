import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../assets/Header';
import Footer from '../assets/Footer';
import EmployeeTable from '../assets/EmployeeTable';
import { deleteEmployee, fetchEmployees } from '../store/actions/employeeActions';
import { Box, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from '../assets/SearchBar';

const ITEMS_PER_PAGE = 10;

const HomePage = () => {
  const dispatch = useDispatch();
  const { loading, error, employees } = useSelector(state => state.employee);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchEmployees());
      } catch (error) {

        toast.error('Error fetching employees');
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDeleteEmployee = async (id) => {
    try {
      await dispatch(deleteEmployee(id));
     
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const nextPage = () => {
    if (currentPage * ITEMS_PER_PAGE < employees.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <Fragment>
      <Header />
   
      <EmployeeTable employees={currentEmployees} onDeleteEmployee={handleDeleteEmployee} />
      <Box sx={{ textAlign: 'center', marginTop: '5px', marginBottom:"30px" }}>
        <Button
          variant="contained"
          onClick={prevPage}
          disabled={currentPage === 1}
          style={{ marginRight: '5px', backgroundColor: '#004c4c', color: 'white', borderRadius: '20px' }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={nextPage}
          disabled={endIndex >= employees.length}
          style={{ marginLeft: '5px', backgroundColor: '#004c4c', color: 'white', borderRadius: '20px' }}
        >
          Next
        </Button>
      </Box>
      <Footer />
      <ToastContainer position="top-right" />
    </Fragment>
  );
};

export default HomePage;
