import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/serviceHighlightsStyly.css";

export default function ServiceHighlights() {
  let [services, setServices] = useState([]);

  useEffect(() => {
    let fetchServices = async () => {
      try {
        let res = await axios.get("/api/services");
        // Sirf 3 services hi show karni hain highlights me
        // setServices(res.data.slice(3, 6));
        setServices([ res.data[0], res.data[5], res.data[2]]);

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
            <div className="col-lg-4 col-md-6 mb-4" key={service._id}>
              <div className="service-card">
                <div className="service-icon ">
                  {/* <i className="fas fa-tools"></i> Default icon */}
                  <img
                style={{ height: "180px", width: "auto", borderRadius: "360px" , marginTop: "4rem" }}
                src={service.image}
                // alt={service.title}
                className="service-hero-image"
              />
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

                <Link to={`/services/${service._id}`} className="service-btn mb-3">
                  Read More <i className="fas fa-arrow-right"></i>
                </Link>
                <br />
                <Link to={`/booking/${service._id}`} className="service-btn">
                  Book Now <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
