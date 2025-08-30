import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/serviceHighlightsStyly.css'

export default function ServiceHighlights() {
  return (
    <div>
        <section className="services-section">
    <div className="container">
        <div className="text-center section-header">
            <h6 className="section-subtitle">Our Services</h6>
            <h2 className="section-title">Premium Air Duct Solutions</h2>
            <p className="section-description">
                Professional cleaning services for healthier indoor air quality and improved HVAC efficiency
            </p>
        </div>

        <div className="row services-row">
            <div className="col-lg-4 col-md-6">
                <div className="service-card">
                    <div className="service-icon">
                        <i className="fas fa-home"></i>
                    </div>
                    <h3 className="service-title">Residential Cleaning</h3>
                    <p className="service-description">
                        Complete air duct cleaning for homes and apartments to remove dust, allergens, and improve air quality.
                    </p>
                    <div className="service-features">
                        <span><i className="fas fa-check"></i> Deep cleaning</span>
                        <span><i className="fas fa-check"></i> Allergy reduction</span>
                        <span><i className="fas fa-check"></i> Odor elimination</span>
                    </div>
                    <Link to="/services/residential" className="service-btn">
                        Learn More <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="service-card">
                    <div className="service-icon">
                        <i className="fas fa-building"></i>
                    </div>
                    <h3 className="service-title">Commercial Services</h3>
                    <p className="service-description">
                        Professional duct cleaning for offices, restaurants, and commercial facilities.
                    </p>
                    <div className="service-features">
                        <span><i className="fas fa-check"></i> After-hours service</span>
                        <span><i className="fas fa-check"></i> Minimal disruption</span>
                        <span><i className="fas fa-check"></i> Commercial-grade equipment</span>
                    </div>
                    <Link to="/services/commercial" className="service-btn">
                        Learn More <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>

            <div className="col-lg-4 col-md-6">
                <div className="service-card">
                    <div className="service-icon">
                        <i className="fas fa-fan"></i>
                    </div>
                    <h3 className="service-title">Dryer Vent Cleaning</h3>
                    <p className="service-description">
                        Prevent fire hazards and improve dryer efficiency with our professional vent cleaning.
                    </p>
                    <div className="service-features">
                        <span><i className="fas fa-check"></i> Fire prevention</span>
                        <span><i className="fas fa-check"></i> Energy savings</span>
                        <span><i className="fas fa-check"></i> Faster drying times</span>
                    </div>
                    <Link to="/services/dryer-vent" className="service-btn">
                        Learn More <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </div>
    </div>
</section>
    </div>
  )
}
