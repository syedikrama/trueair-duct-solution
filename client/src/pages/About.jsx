import React from 'react'
import '../styles/aboutStyle.css'

export default function About() {
  return (
    <div>
        <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">About TrueAir Duct Solutions</h1>
              <p className="hero-subtitle">
                Leading the industry in professional air duct cleaning services since 2010
              </p>
              <p className="hero-description">
                With over a decade of experience, we've been helping homeowners and businesses 
                breathe cleaner air through our comprehensive duct cleaning services. Our certified 
                technicians use state-of-the-art equipment to ensure your HVAC system operates 
                at peak efficiency.
              </p>
            </div>
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                alt="About TrueAir Duct Solutions" 
                className="img-fluid hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3>Our Mission</h3>
                <p>
                  To provide exceptional air duct cleaning services that improve indoor air quality, 
                  reduce energy costs, and create healthier living environments for our clients.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Our Vision</h3>
                <p>
                  To become the leading provider of air quality solutions, setting industry standards 
                  for excellence and innovation in duct cleaning services.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h3>Our Values</h3>
                <p>
                  Integrity, quality, and customer satisfaction are at the core of everything we do. 
                  We believe in transparent pricing and honest service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <img 
                src="https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                alt="Our Story" 
                className="img-fluid story-image"
              />
            </div>
            <div className="col-lg-6">
              <div className="story-content">
                <h2>Our Story</h2>
                <p>
                  Founded in 2010 by John Smith, a HVAC specialist with over 20 years of experience, 
                  TrueAir Duct Solutions began with a simple mission: to help people breathe cleaner, 
                  healthier air in their homes and workplaces.
                </p>
                <p>
                  What started as a small local business has grown into a trusted regional service provider, 
                  thanks to our commitment to quality work and customer satisfaction. We've invested in 
                  the latest equipment and continuous training to ensure we deliver the best results possible.
                </p>
                <div className="achievements">
                  <div className="achievement-item">
                    <span className="achievement-number">5,000+</span>
                    <span className="achievement-text">Projects Completed</span>
                  </div>
                  <div className="achievement-item">
                    <span className="achievement-number">98%</span>
                    <span className="achievement-text">Customer Satisfaction</span>
                  </div>
                  <div className="achievement-item">
                    <span className="achievement-number">15+</span>
                    <span className="achievement-text">Certified Technicians</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Leadership Team</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="John Smith" 
                  className="team-image"
                />
                <h4>John Smith</h4>
                <p className="team-role">Founder & CEO</p>
                <p className="team-bio">
                  With 20+ years in HVAC industry, John leads our team with expertise and vision.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Sarah Johnson" 
                  className="team-image"
                />
                <h4>Sarah Johnson</h4>
                <p className="team-role">Operations Manager</p>
                <p className="team-bio">
                  Sarah ensures every project meets our high standards of quality and efficiency.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="team-card">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                  alt="Mike Chen" 
                  className="team-image"
                />
                <h4>Mike Chen</h4>
                <p className="team-role">Lead Technician</p>
                <p className="team-bio">
                  Mike is NADCA certified with 15 years of experience in duct cleaning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications-section">
        <div className="container">
          <h2 className="section-title">Our Certifications</h2>
          <div className="certifications-grid">
            <div className="certification-item">
              <i className="fas fa-award"></i>
              <h5>NADCA Certified</h5>
              <p>National Air Duct Cleaners Association</p>
            </div>
            <div className="certification-item">
              <i className="fas fa-shield-alt"></i>
              <h5>Fully Insured</h5>
              <p>Comprehensive liability coverage</p>
            </div>
            <div className="certification-item">
              <i className="fas fa-medal"></i>
              <h5>BBB Accredited</h5>
              <p>A+ Rating with Better Business Bureau</p>
            </div>
            <div className="certification-item">
              <i className="fas fa-certificate"></i>
              <h5>EPA Certified</h5>
              <p>Environmental Protection Agency standards</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  )
}
