// Services.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/servicesStyle.css"; // Import the CSS file

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/services");
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
