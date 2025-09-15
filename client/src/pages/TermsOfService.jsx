import React from 'react';
import { Link } from 'react-router-dom';
// import './TermsOfService.css'; // Create this CSS file

export default function TermsOfService() {
  return (
    <div className="terms-of-service-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {/* Breadcrumb */}
            <nav className="breadcrumb-nav">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-active">Terms of Service</span>
            </nav>

            {/* Header */}
            <div className="terms-header">
              <h1 className="terms-title">Terms of Service</h1>
              <p className="terms-update-date">Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>

            {/* Terms Content */}
            <div className="terms-content">
              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">1</span>
                  Acceptance of Terms
                </h3>
                <p className="section-text">
                  By accessing and using TrueAir Duct Solutions' website and services, 
                  you accept and agree to be bound by these Terms of Service.
                </p>
              </section>

              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">2</span>
                  Services Provided
                </h3>
                <p className="section-text">
                  TrueAir Duct Solutions provides air duct cleaning, HVAC system cleaning, 
                  dryer vent cleaning, and related services as described on our website.
                </p>
              </section>

              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">3</span>
                  Booking and Payments
                </h3>
                <p className="section-text">
                  Services are subject to availability. Quotes provided are estimates and 
                  final pricing may vary based on actual service requirements. Payment terms 
                  will be discussed and agreed upon before service provision.
                </p>
              </section>

              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">4</span>
                  Cancellation Policy
                </h3>
                <p className="section-text">
                  Customers may cancel or reschedule appointments with at least 24 hours notice. 
                  Late cancellations may be subject to a cancellation fee.
                </p>
              </section>

              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">5</span>
                  Limitation of Liability
                </h3>
                <p className="section-text">
                  TrueAir Duct Solutions shall not be liable for any indirect, incidental, 
                  special, consequential, or punitive damages resulting from our services.
                </p>
              </section>

              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">6</span>
                  Governing Law
                </h3>
                <p className="section-text">
                  These terms shall be governed by and construed in accordance with the laws 
                  of North Carolina, United States.
                </p>
              </section>

              <section className="terms-section">
                <h3 className="section-title">
                  <span className="section-number">7</span>
                  Contact Information
                </h3>
                <p className="section-text">
                  For any questions about these Terms of Service, please contact us:
                </p>
                <div className="contact-info">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>trueairduct881@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>(463) 227-5480</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Inline CSS */}
      <style jsx>{`
        .terms-of-service-page {
          padding: 100px 0 50px;
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          min-height: 100vh;
        }
        
        .breadcrumb-nav {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }
        
        .breadcrumb-link {
          color: #2c6b9e;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .breadcrumb-link:hover {
          color: #ff6b00;
        }
        
        .breadcrumb-separator {
          margin: 0 0.5rem;
          color: #6c757d;
        }
        
        .breadcrumb-active {
          color: #6c757d;
          font-weight: 500;
        }
        
        .terms-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .terms-title {
          color: #2c6b9e;
          font-weight: 800;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .terms-update-date {
          color: #6c757d;
          font-size: 1.1rem;
        }
        
        .terms-content {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .terms-section {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e9ecef;
        }
        
        .terms-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        
        .section-title {
          display: flex;
          align-items: center;
          color: #2c6b9e;
          font-weight: 700;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }
        
        .section-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #ff6b00 0%, #e55e00 100%);
          color: white;
          border-radius: 50%;
          font-size: 0.9rem;
          font-weight: 600;
          margin-right: 1rem;
        }
        
        .section-text {
          color: #5a5a5a;
          line-height: 1.7;
          font-size: 1.05rem;
          margin-bottom: 1rem;
        }
        
        .contact-info {
          margin-top: 1rem;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
          color: #5a5a5a;
        }
        
        .contact-item i {
          color: #2c6b9e;
          margin-right: 0.8rem;
          font-size: 1.1rem;
          width: 20px;
        }
        
        @media (max-width: 768px) {
          .terms-of-service-page {
            padding: 80px 0 30px;
          }
          
          .terms-title {
            font-size: 2rem;
          }
          
          .terms-content {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 1.1rem;
          }
          
          .section-text {
            font-size: 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .terms-title {
            font-size: 1.8rem;
          }
          
          .breadcrumb-nav {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
}