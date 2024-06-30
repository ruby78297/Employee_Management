import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './assets/Header';
import Footer from './assets/Footer';
import HomePage from './page/HomePage';
import AddNewEmployee from './page/AddNewEmployee';
import EditEmployee from './page/EditEmployee';

function App() {
  return (
   <BrowserRouter>
     
     
        <Routes>
          <Route path='/' element={<HomePage />} />
        <Route path='/add-new-employee' element={<AddNewEmployee />} />
        <Route path="/edit-employee/:employeeId" element={<EditEmployee />} />

        </Routes>
     
     
    </BrowserRouter>
  );
}

export default App;
