import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
    <div className="App">
      <Routes>
        {/* <Route path='/n' element={<Navbar/>}/> */}
        <Route path='/' element={<Home/>}/>

      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
