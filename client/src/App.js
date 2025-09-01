import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Footer from './Components/Footer';
import Gallery from './pages/Gallery';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Navbar/>
    <div className="App">
      <Routes>
        {/* <Route path='/n' element={<Navbar/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />



      </Routes>
    </div>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
