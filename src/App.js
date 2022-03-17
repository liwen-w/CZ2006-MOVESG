
import Login from './loginPage/login';
import Home from './homePage/homePage';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <>
        <Router>
          <Navbar />
          <Routes>
            <Route exact path = "/" element = {<Home />}></Route>
            <Route path ="/login" element = {<Login />}></Route>
          </Routes>
      </Router>
    </>
  );
}

export default App;
