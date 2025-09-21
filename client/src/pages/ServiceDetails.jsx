import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/serviceDetailsStyle.css";
// import image from '../assets/images/service_1';

export default function ServiceDetails() {
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



  let { serviceId } = useParams();
  let [service, setService] = useState(null);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchService = async () => {
      try {
        let res = await axios.get(
          `http://localhost:3001/api/services/${serviceId}`
        );
        setService(res.data);
      } catch (err) {
        console.error("Error fetching service details:", err);
        setService(null);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
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
      {/* <nav className="breadcrumb-container">
        <div className="container">
          <Link to="/">Home</Link> /<Link to="/services">Services</Link> /
          <span>{service.title}</span>
        </div>
      </nav> */}


      {/* Packages Section - Add this after Benefits section */}

              <h1 className="package-price mt-3">{service.title}</h1>

      {/* Packages Section */}
      <section className="packages-section">
        <div className="container">
          {/* <h2 className="section-title">Our Cleaning Packages</h2> */}

          {service.packages?.length > 0 ? (
            service.packages.map((pkg, index) => (
              <div key={index} className={`package-card ${pkg.isPopular ? "premium" : ""}`}>
                <div className="package-header">
                  <h3>{pkg.name}</h3>
                  <div className="package-price">${pkg.price}</div>
                </div>

                <div className="package-includes">
                  <h4>Package Includes:</h4>
                  <ul className="package-features">
                    {Array.isArray(pkg.features) && pkg.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check-circle"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                   <div className="service-meta">
                <div className="meta-item">
                  <i className="fas fa-clock"></i>
                  <span>{service.duration}</span>
                </div>
              </div>
                </div>

                <div className="package-cta">
                  <Link
                    to={`/booking/${serviceId}?package=${pkg.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="btn btn-primary btn-package"
                  >
                    <i className="fas fa-shopping-cart"></i> Book {pkg.name}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No packages available for this service.</p>
          )}
         
        </div>
      </section>


      {/* Hero Section */}
      <section className="service-hero">
        <div className="container">
          <div className="row align-items-center">
            {/* <div className="col-lg-6">
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
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{service.coverage}</span>
                </div>
              </div>
              <Link to={`/booking/${serviceId}`}
              >
                <button className="btn btn-primary btn-book mb-4">
                  <i className="fas fa-calendar-check"></i> Book This Service
                </button>
              </Link>
            </div> */}

            <div className="col-lg-12">
  <img
    style={{
      width: "100%",          // container ke andar fit ho
      height: "auto",         // aspect ratio maintain ho
      borderRadius: "10px",
      objectFit: "cover"      // optional: image crop na ho, nicely fit ho
    }}
    src={service.image}
    alt={service.title}
    className="service-hero-image"
  />
</div>

            {/* <div className="col-lg-12">
              <img
                style={{ height: "450px", width: "auto", borderRadius: "10px" }}
                src={service.image}
                alt={service.title}
                className="service-hero-image"
              />
            </div> */}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Benefits of {service.title}</h2>
          <div className="row">
            {service.benefits?.map((benefit, index) => (
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


      {/* Process */}
      <section className="process-section">
        <div className="container">
          <h2 className="section-title">Our Cleaning Process</h2>
          <div className="process-steps">
            {service.process?.map((step, index) => (
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

      {/* CTA */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Ready to Get Started?</h2>
          <p>
            Schedule your {service.title} service today and breathe easier
            tomorrow
          </p>
          <div className="cta-buttons">
            {/* <button className="btn btn-primary btn-lg">
              <i className="fas fa-phone"></i> Call Now: (463) 227-5480
            </button> */}
            <Link
              to={`/booking/${serviceId}`}
              className="btn btn-primary btn-lg"
            >
              <i className="fas fa-calendar"></i> Schedule Online
            </Link>
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
  );
}
