import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../styles/serviceDetailsStyle.css';

export default function ServiceDetails() {
  const { serviceId } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulated database data
  const servicesData = {
    'air-duct-cleaning': {
      id: 'air-duct-cleaning',
      title: 'Air Duct Cleaning',
      image: 'https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60',
      description: 'Professional air duct cleaning removes dust, allergens, and contaminants from your HVAC system, improving indoor air quality and system efficiency.',
      benefits: [
        'Improved indoor air quality',
        'Reduced allergens and irritants',
        'Increased HVAC system efficiency',
        'Lower energy bills',
        'Extended HVAC system lifespan'
      ],
      process: [
        'Inspection of duct system',
        'Use of specialized equipment',
        'Thorough cleaning of all components',
        'Sanitization and deodorization',
        'Final quality check'
      ],
      price: 'Starting from $199',
      duration: '2-4 hours',
      coverage: 'Entire duct system'
    },
    'dryer-vent-cleaning': {
      id: 'dryer-vent-cleaning',
      title: 'Dryer Vent Cleaning',
      image: 'https://images.unsplash.com/photo-1632882001413-801bf290a87c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeWVyJTIwdmVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
      description: 'Professional dryer vent cleaning prevents fire hazards, improves dryer efficiency, and reduces drying time.',
      benefits: [
        'Fire hazard prevention',
        'Reduced drying time',
        'Lower energy consumption',
        'Extended dryer lifespan',
        'Improved clothing care'
      ],
      process: [
        'Visual inspection of vent system',
        'Removal of lint buildup',
        'Cleaning with specialized tools',
        'System performance test',
        'Safety recommendations'
      ],
      price: 'Starting from $99',
      duration: '1-2 hours',
      coverage: 'Complete vent system'
    },
    // Add other services similarly...
    'hvac-system-cleaning': {
      id: 'hvac-system-cleaning',
      title: 'HVAC System Cleaning',
      image: 'https://images.unsplash.com/photo-1616604744535-5b9e9785f77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh2YWMlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60',
      description: 'Comprehensive cleaning of your entire HVAC system for optimal performance and air quality.',
      benefits: [
        'Improved system efficiency',
        'Better air circulation',
        'Reduced energy costs',
        'Extended equipment life',
        'Enhanced indoor comfort'
      ],
      process: [
        'Complete system inspection',
        'Cleaning of all components',
        'Filter replacement',
        'System optimization',
        'Performance testing'
      ],
      price: 'Starting from $299',
      duration: '3-5 hours',
      coverage: 'Complete HVAC system'
    }
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const serviceDetails = servicesData[serviceId];
      setService(serviceDetails);
      setLoading(false);
    }, 500);
  }, [serviceId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="error-container">
        <h2>Service Not Found</h2>
        <p>The requested service could not be found.</p>
        <Link to="/services" className="btn btn-primary">
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      {/* Breadcrumb */}
      <nav className="breadcrumb-container">
        <div className="container">
          <Link to="/">Home</Link> / 
          <Link to="/services">Services</Link> / 
          <span>{service.title}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="service-title">{service.title}</h1>
              <p className="service-description">{service.description}</p>
              <div className="service-meta">
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>{service.duration}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-dollar-sign"></i>
                  <span>{service.price}</span>
                </div>
                <div className="meta-item">
                  <i className="fas fa-coverage"></i>
                  <span>{service.coverage}</span>
                </div>
              </div>
              <button className="btn btn-primary btn-book">
                <i className="fas fa-calendar-check"></i> Book This Service
              </button>
            </div>
            <div className="col-lg-6">
              <img 
                src={service.image} 
                alt={service.title} 
                className="service-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Benefits of {service.title}</h2>
          <div className="row">
            {service.benefits.map((benefit, index) => (
              <div key={index} className="col-md-6 col-lg-4 mb-4">
                <div className="benefit-card">
                  <div className="benefit-icon">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <h5>{benefit}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Cleaning Process</h2>
          <div className="process-steps">
            {service.process.map((step, index) => (
              <div key={index} className="process-step">
                <div className="step-number">{index + 1}</div>
                <div className="step-content">
                  <h4>Step {index + 1}</h4>
                  <p>{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p>Schedule your {service.title} service today and breathe easier tomorrow</p>
          <div className="cta-buttons">
            <button className="btn btn-primary btn-lg">
              <i className="fas fa-phone"></i> Call Now: 0019-0022002
            </button>
<Link to={`/booking/${serviceId}`} className="btn btn-primary btn-lg">
  <i className="fas fa-calendar"></i> Schedule Online
</Link>
          </div>
        </div>
      </section>
    </div>
  );
}



