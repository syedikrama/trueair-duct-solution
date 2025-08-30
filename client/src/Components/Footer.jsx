import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/footerStyle.css'

export default function Footer() {
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

            {/* Services */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="footer-widget">
                <h5 className="footer-title">Our Services</h5>
                <ul className="footer-links">
                  <li><Link to="/services/residential">Residential Cleaning</Link></li>
                  <li><Link to="/services/commercial">Commercial Cleaning</Link></li>
                  <li><Link to="/services/dryer-vent">Dryer Vent Cleaning</Link></li>
                  <li><Link to="/services/hvac">HVAC System Cleaning</Link></li>
                  <li><Link to="/services/mold">Mold Remediation</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="footer-widget">
                <h5 className="footer-title">Contact Info</h5>
                <div className="footer-contact">
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>123 Clean Air Street, City, State 12345</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>0019-0022002</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>info@trueairducts.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-clock"></i>
                    <span>Mon-Sat: 8:00 AM - 8:00 PM</span>
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
                © 2024 TrueAir Duct Solutions. All rights reserved.
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
