import { combineReducers } from 'redux';
import employeeReducer from './employeeReducer';

const rootReducer = combineReducers({
  employee: employeeReducer,
  // Add other reducers as needed
});

export default rootReducer;
