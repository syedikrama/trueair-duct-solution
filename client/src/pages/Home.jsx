import React from 'react'
import { Link } from "react-router-dom";
import Banner from './Banner';
import ServiceHighlights from './ServiceHighlights';
import Contact from './Contact';



export default function Home() {
  return (
    <div>
      <Banner/>


      {/* Why Choose Us Section */}
<div className="why-choose-us py-5">
  <div className="container">
    <div className="row align-items-center">
      {/* Left Side - Image */}
      <div className="col-lg-6 mb-4 mb-lg-0">
        <div className="image-container position-relative">
          <img
            src="https://firstcallnc.com/wp-content/uploads/2019/12/Air-duct-cleaning-1024x587-1024x585.jpg"
            alt="Professional Air Duct Cleaning"
            className="img-fluid rounded shadow"
          />
          <div className="experience-badge">
            <span className="years">15+</span>
            <span className="text">Years Experience</span>
          </div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="col-lg-6">
        <h6 className="section-subtitle">Why TrueAir Duct Solutions</h6>
        <h2 className="section-title">Why Homeowners Trust Our Services</h2>
        <p className="section-description">
          With over 15 years of expertise, we deliver exceptional air duct cleaning 
          that improves indoor air quality, reduces energy costs, and creates a 
          healthier living environment for your family.
        </p>

        {/* Features Grid */}
        <div className="row mt-4">
          <div className="col-sm-6 mb-4">
            <div className="feature-card">
              <div className="icon-box">
                <i className="fas fa-user-tie"></i>
              </div>
              <h5>Certified Technicians</h5>
              <p>NADCA certified professionals with extensive training</p>
            </div>
          </div>
          
          <div className="col-sm-6 mb-4">
            <div className="feature-card">
              <div className="icon-box">
                <i className="fas fa-tools"></i>
              </div>
              <h5>Advanced Equipment</h5>
              <p>Industrial-grade tools for thorough cleaning results</p>
            </div>
          </div>
          
          <div className="col-sm-6 mb-4">
            <div className="feature-card">
              <div className="icon-box">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h5>Full Insurance</h5>
              <p>Fully insured and bonded for your peace of mind</p>
            </div>
          </div>
          
          <div className="col-sm-6 mb-4">
            <div className="feature-card">
              <div className="icon-box">
                <i className="fas fa-medal"></i>
              </div>
              <h5>Quality Guarantee</h5>
              <p>100% satisfaction guarantee on all our services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

<ServiceHighlights/>


<section className="py-5 bg-light">
      <div className="container">
        <div className="row text-center">
          <div className="col-md-3">
            <h2 className="fw-bold text-primary">1500+</h2>
            <p>Happy Clients</p>
          </div>
          <div className="col-md-3">
            <h2 className="fw-bold text-primary">12+</h2>
            <p>Years Experience</p>
          </div>
          <div className="col-md-3">
            <h2 className="fw-bold text-primary">5000+</h2>
            <p>Projects Completed</p>
          </div>
          <div className="col-md-3">
            <h2 className="fw-bold text-primary">24/7</h2>
            <p>Emergency Service</p>
          </div>
        </div>
      </div>
    </section>

<Contact/>


    </div>
  )
}
