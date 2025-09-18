import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/thankyouStyle.css";

let ThankYou = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="thank-you-page">
      <div className="container">
        <div className="thank-you-content">
          <div className="success-animation">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          
          <h1 className="thank-you-title">Booking Confirmed! 🎉</h1>
          
          <p className="thank-you-message">
            Thank you for choosing TrueAir Duct Solutions. Your booking has been successfully received.
          </p>
          
          <div className="confirmation-details">
            <div className="detail-item">
              <i className="fas fa-envelope"></i>
              <span>A confirmation email has been sent to your inbox</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-clock"></i>
              <span>We'll contact you within 24 hours to confirm your appointment</span>
            </div>
            <div className="detail-item">
              <i className="fas fa-phone"></i>
              <span>For immediate assistance, call us at <strong>(463) 227-5480</strong></span>
            </div>
          </div>

          <div className="thank-you-actions">
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-home"></i> Back to Home
            </Link>
            <Link to={`/services`} className="btn btn-outline">
              <i className="fas fa-concierge-bell"></i> View Other Services
            </Link>
          </div>

          <div className="emergency-contact">
            <h3>Need Immediate Help?</h3>
            <p>For urgent matters, contact us directly:</p>
            <a href="(463) 227-5480" className="emergency-number">
              <i className="fas fa-phone-alt"></i> (463) 227-5480
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;