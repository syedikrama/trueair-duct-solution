import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/homeStyle.css"
import banner from '../assets/images/banner_1.jpeg'
import banner_3 from '../assets/images/banner_3.jpeg'

export default function Banner() {
  return (
    <div>
        <div className="banner-container">
      {/* Background Image with Overlay */}
      <div className="banner-image">
        <img
          src={banner_3}
          alt="Professional Air Duct Cleaning Services"
          className="img-fluid w-100 banner-img"
        />
        
        {/* Dark Overlay */}
        <div className="banner-overlay"></div>
      </div>

      {/* Content */}
      <div className="banner-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h6 className="banner-subtitle">Premium Cleaning Services</h6>
              <h1 className="banner-title">Professional Air Duct Cleaning</h1>
              <p className="banner-text">
                Breathe easier with our expert air duct cleaning services. We remove dust, allergens, 
                and contaminants to improve your indoor air quality and HVAC system efficiency.
              </p>
              
              <div className="banner-features">
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Certified Technicians</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Eco-Friendly Solutions</span>
                </div>
                <div className="feature-item">
                  <i className="fas fa-check-circle"></i>
                  <span>Same Day Service Available</span>
                </div>
              </div>
              
              <div className="banner-buttons mt-4">
                <Link to="/booking" className="btn btn-primary btn-lg me-3">
                  <i className="fas fa-calendar-check me-2"></i>Book Now
                </Link>
                <Link to="/services" className="btn btn-outline-light btn-lg">
                  <i className="fas fa-info-circle me-2"></i>Our Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style jsx>{`
    `}</style>
    </div>
  )
}