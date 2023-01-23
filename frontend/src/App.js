import React from 'react'
import EmployeeList from './Components/EmployeeList';
import Register from './Components/Register';
import {ToastContainer} from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Register/>
      <EmployeeList/>
      <ToastContainer/>
    </div>
  );
}

export default App;
