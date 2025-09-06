import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/serviceHighlightsStyly.css";

export default function ServiceHighlights() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/services");
        // Sirf 3 services hi show karni hain highlights me
        setServices(res.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="services-section">
      <div className="container">
        {/* Section Header */}
        <div className="text-center section-header">
          <h6 className="section-subtitle">Our Services</h6>
          <h2 className="section-title">Premium Air Duct Solutions</h2>
          <p className="section-description">
            Professional cleaning services for healthier indoor air quality and
            improved HVAC efficiency
          </p>
        </div>

        {/* Services Row */}
        <div className="row services-row">
          {services.map((service) => (
            <div className="col-lg-4 col-md-6" key={service._id}>
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-tools"></i> {/* Default icon */}
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-features">
                  {service.benefits?.slice(0, 3).map((benefit, idx) => (
                    <span key={idx}>
                      <i className="fas fa-check"></i> {benefit}
                    </span>
                  ))}
                </div>

                <Link to={`/services/${service._id}`} className="service-btn">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
