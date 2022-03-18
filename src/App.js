import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Login from './components/LoginRegister/Login';
import Register from './components/LoginRegister/Register';
import Reset from './components/LoginRegister/Reset';
import Dashboard from './components/LoginRegister/Dashboard';

import Home from './components/homePage/Home';

function App() {
  return (
    
    <>
        <BrowserRouter>
          <Navbar />


          <Routes>

              <Route path = "/" element = {<Home/>}/>
              <Route path = "/login" element={<Login/>}/>
              <Route path = "/register" element={<Register/>}/>
              <Route path = "/reset" element={<Reset/>}/>
              <Route path = "/dashboard" element={<Dashboard/>}/>

          </Routes>
        </BrowserRouter>
    </>

  );
}

export default App;