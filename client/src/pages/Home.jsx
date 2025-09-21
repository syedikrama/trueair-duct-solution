import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Banner from './Banner';
import ServiceHighlights from './ServiceHighlights';
import Contact from './Contact';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check scroll position to show/hide the button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
                  src="/images/home_1.jpg"
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

      {/* <Contact/> */}

      {/* CTA Section */}
      <section className="gallery-cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2>Ready to Improve Your Air Quality?</h2>
              <p>Schedule your air duct cleaning service today and breathe easier tomorrow</p>
              <div className="cta-buttons">
                {/* <Link to={`/contact`}>
                  <button className="btn btn-primary">Get Free Estimate</button>
                </Link> */}
                <Link to={`/services`}>
                  <button className="btn btn-outline">View All Services</button>
                </Link>
                <Link to={`/booking`}>
                  <button className="btn btn-primary">Book Service Now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          className="scroll-top-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  )
}