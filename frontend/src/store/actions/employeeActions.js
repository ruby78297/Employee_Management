import axios from 'axios';
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  ADD_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_FAILURE,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAILURE,
} from './types';

const API_URL = 'http://localhost:5000/api/employees';

export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEES_REQUEST });

  try {
    const response = await axios.get(API_URL);
    dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: response.data });
    return response.data; 
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
    throw error; 
  }
};

export const addEmployee = (employeeData) => async (dispatch) => {
  dispatch({ type: ADD_EMPLOYEE_REQUEST });

  try {
    const response = await axios.post(API_URL, employeeData);
    dispatch({ type: ADD_EMPLOYEE_SUCCESS, payload: response.data });
    dispatch(fetchEmployees());

    return response.data; 
  } catch (error) {
    dispatch({ type: ADD_EMPLOYEE_FAILURE, payload: error.message });
    throw error; 
  }
};

export const updateEmployee = (employeeId, employeeData) => async (dispatch) => {
  dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

  try {
    const response = await axios.patch(`${API_URL}/${employeeId}`, employeeData);
    dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: response.data });
    dispatch(fetchEmployees());
    return response.data; 
  } catch (error) {
    dispatch({ type: UPDATE_EMPLOYEE_FAILURE, payload: error.message });
    throw error; 
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  dispatch({ type: DELETE_EMPLOYEE_REQUEST });

  try {
    await axios.delete(`${API_URL}/${employeeId}`);
    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: employeeId });

  } catch (error) {
    dispatch({ type: DELETE_EMPLOYEE_FAILURE, payload: error.message });
    throw error; 
  }
};


