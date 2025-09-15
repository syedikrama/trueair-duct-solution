import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/footerStyle.css'
import axios from 'axios';

export default function Footer() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <footer className="footer">
        <div className="footer-main">
          <div className="container">
            <div className="row">
              {/* Company Info */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <i className="fas fa-wind"></i>
                    <span>TrueAir Duct Solutions</span>
                  </div>
                  <p className="footer-description">
                    Professional air duct cleaning services for healthier indoor air quality
                    and improved HVAC system efficiency. Serving homes and businesses since 2010.
                  </p>
                  <div className="footer-social">
                    <a href="#" className="social-link">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social-link">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="social-link">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="social-link">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-2 col-md-6 mb-4">
                <div className="footer-widget">
                  <h5 className="footer-title">Quick Links</h5>
                  <ul className="footer-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/gallery">Gallery</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                  </ul>
                </div>
              </div>

              {/* Services Section */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="footer-widget">
                  <h5 className="footer-title">Our Services</h5>
                  {loading ? (
                    <p>Loading services...</p>
                  ) : (
                    <ul className="footer-links">
                      {services.slice(0, 5).map(service => (
                        <li key={service._id}>
                          <Link to={`/services/${service._id}`}>
                            {service.title}
                          </Link>
                        </li>
                      ))}
                      {/* View All Services link */}
                      <li>
                        <Link to="/services" className="view-all-link">
                          View All Services →
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="footer-widget">
                  <h5 className="footer-title">Contact Info</h5>
                  <div className="footer-contact">
                    <div className="contact-item">
                      <i className="fas fa-map-marker-alt"></i>
                      <span className='text-white'>Charlotte, North Carolina, 28202</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-phone"></i>
                      <span className='text-white'>(463) 227-5480</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-envelope"></i>
                      <span className='text-white'>trueairduct881@gmail.com</span>
                    </div>
                    <div className="contact-item">
                      <i className="fas fa-clock"></i>
                      <span className='text-white'>Mon-Sun: 7:00 AM - 7:00 PM / Sat-Close</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p className="copyright">
                  © 2010 TrueAir Duct Solutions. All rights reserved.
                </p>
              </div>
              <div className="col-md-6">
                <div className="footer-bottom-links">
                  <Link to="/privacy">Privacy Policy</Link>
                  <Link to="/terms">Terms of Service</Link>
                  <Link to="/sitemap">Sitemap</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}