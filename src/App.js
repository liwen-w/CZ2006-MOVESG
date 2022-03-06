import Navbar from './components/Navbar';
import Login from './components/Login';

import { BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>

      <BrowserRouter>
        <Navbar />

        <Routes>

            <Route path = "/" />

            <Route path = "/login" element={<Login />}/>

        </Routes>
      </BrowserRouter>
    </>


  );
}

export default App;
