// Services.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/servicesStyle.css"; // Import the CSS file

export default function Services() {
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



  let [services, setServices] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let fetchServices = async () => {
      try {
        let res = await axios.get("/api/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading services...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <header className="services-header">
        <div className="container">
          <h1>Our Air Duct Services</h1>
          <p>
            Professional cleaning solutions for healthier indoor air quality and
            improved HVAC efficiency
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <div className="services-container">
        <div className="container">
          <div className="row g-4">
            {services.map((service) => (
              <div className="col-md-4" key={service._id}>
                <div className="service-card">
                  <img
                    src={service.image}
                    className="card-img-top service-img"
                    alt={service.title}
                  />
                  <div className="service-card-body">
                    <h5 className="service-title">{service.title}</h5>
                    <p className="service-text">{service.description}</p>
                    <Link
                      to={`/services/${service._id}`}
                      className="service-btn"
                    >
                      Read More
                    </Link>
                    <Link
                      to={`/booking/${service._id}`}
                      className="service-btn mt-3"
                    >
                      Book Your Appointment
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
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
