import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.js';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Footer from './Components/Footer';
import Gallery from './pages/Gallery';
import ServiceDetails from './pages/ServiceDetails';
import BookingPage from './pages/BookingPage';
import ThankYou from './pages/ThankYou';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './Components/ProtectedRoute';

  function App() {
    return (
      <BrowserRouter>
        <Header />
        <Navbar />
        <div className="App">
          <Routes>
            {/* <Route path='/n' element={<Navbar/>}/> */}
            <Route path='/' element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services/:serviceId" element={<ServiceDetails />} />
            <Route path="/booking/:serviceId?" element={<BookingPage />} />
            <Route path="/thank-you" element={<ThankYou />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route path="/login" element={<Login />} />
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
<Route path="/" element={<Navigate to="/login" />} />




          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    );
  }

export default App;
