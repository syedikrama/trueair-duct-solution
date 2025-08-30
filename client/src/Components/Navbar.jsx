import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-wind me-2"></i>
          TrueAir Duct Solutions
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <i className="fas fa-info-circle me-1"></i> About
              </Link>
            </li>
            
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-concierge-bell me-1"></i> Services
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/services/duct-cleaning">Air Duct Cleaning</Link></li>
                <li><Link className="dropdown-item" to="/services/dryer-vent">Dryer Vent Cleaning</Link></li>
                <li><Link className="dropdown-item" to="/services/hvac">HVAC System Cleaning</Link></li>
                <li><hr className="dropdown-divider"/></li>
                <li><Link className="dropdown-item" to="/services">All Services</Link></li>
              </ul>
            </li>
            
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                <i className="fas fa-images me-1"></i> Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <i className="fas fa-phone me-1"></i> Contact
              </Link>
            </li>
          </ul>
          
          <form className="d-flex ms-lg-3">
            <input 
              className="form-control me-2 search-input" 
              type="search" 
              placeholder="Search services..." 
            />
            <button className="btn btn-search" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      </div>
      
      <style jsx>{`
        .custom-navbar {
          background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          padding: 0.8rem 1rem;
        }
        
        .navbar-brand {
          font-weight: 700;
          font-size: 1.8rem;
          display: flex;
          align-items: center;
        }
        
        .navbar-brand i {
          color: #ff6b00;
          font-size: 2rem;
        }
        
        .nav-link {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          padding: 0.8rem 1rem !important;
          margin: 0 2px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }
        
        .nav-link:hover, .nav-link.active {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        
        .dropdown-menu {
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 0.5rem;
        }
        
        .dropdown-item {
          padding: 0.7rem 1.2rem;
          border-radius: 5px;
          transition: all 0.2s ease;
        }
        
        .dropdown-item:hover {
          background-color: #f0f7ff;
          color: #2c6b9e;
        }
        
        .btn-search {
          background-color: #ff6b00;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 0.5rem 1.2rem;
          transition: all 0.3s ease;
        }
        
        .btn-search:hover {
          background-color: #e55e00;
          transform: translateY(-2px);
        }
        
        .search-input {
          border-radius: 5px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.15);
          color: white;
        }
        
        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        .navbar-toggler {
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.4rem 0.6rem;
        }
        
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
            padding: 1rem;
            border-radius: 8px;
            margin-top: 0.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          
          .search-input {
            margin-top: 1rem;
          }
        }
      `}</style>
    </nav>
    </div>
  );
}