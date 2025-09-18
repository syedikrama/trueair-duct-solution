import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
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
  
  return (
    <div className="privacy-policy-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {/* Breadcrumb */}
            <nav className="breadcrumb-nav">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-active">Privacy Policy</span>
            </nav>

            {/* Header */}
            <div className="privacy-header">
              <h1 className="privacy-title">Privacy Policy</h1>
              <p className="privacy-update-date">Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</p>
            </div>

            {/* Privacy Content */}
            <div className="privacy-content">
              <section className="privacy-section">
                <h3 className="section-title">
                  <span className="section-number">1</span>
                  Information We Collect
                </h3>
                <p className="section-text">
                  At TrueAir Duct Solutions, we collect information that you provide directly to us, 
                  including when you fill out contact forms, request services, or communicate with us. 
                  This may include your name, email address, phone number, address, and service details.
                </p>
              </section>

              <section className="privacy-section">
                <h3 className="section-title">
                  <span className="section-number">2</span>
                  How We Use Your Information
                </h3>
                <p className="section-text">
                  We use the information we collect to:
                </p>
                <ul className="section-list">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Communicate with you about products, services, and promotions</li>
                </ul>
              </section>

              <section className="privacy-section">
                <h3 className="section-title">
                  <span className="section-number">3</span>
                  Information Sharing
                </h3>
                <p className="section-text">
                  We do not sell, trade, or otherwise transfer your personal information to outside parties 
                  except for trusted third parties who assist us in operating our website, conducting our business, 
                  or servicing you, so long as those parties agree to keep this information confidential.
                </p>
              </section>

              <section className="privacy-section">
                <h3 className="section-title">
                  <span className="section-number">4</span>
                  Data Security
                </h3>
                <p className="section-text">
                  We implement appropriate security measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="privacy-section">
                <h3 className="section-title">
                  <span className="section-number">5</span>
                  Your Rights
                </h3>
                <p className="section-text">
                  You have the right to access, correct, or delete your personal information. 
                  Please contact us at trueairduct881@gmail.com to exercise these rights.
                </p>
              </section>

              <section className="privacy-section">
                <h3 className="section-title">
                  <span className="section-number">6</span>
                  Contact Us
                </h3>
                <p className="section-text">
                  If you have any questions about this Privacy Policy, please contact us at:
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

      {/* Inline CSS */}
      <style jsx>{`
        .privacy-policy-page {
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
        
        .privacy-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .privacy-title {
          color: #2c6b9e;
          font-weight: 800;
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        
        .privacy-update-date {
          color: #6c757d;
          font-size: 1.1rem;
        }
        
        .privacy-content {
          background: white;
          padding: 2.5rem;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .privacy-section {
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid #e9ecef;
        }
        
        .privacy-section:last-child {
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
          background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
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
        
        .section-list {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        
        .section-list li {
          color: #5a5a5a;
          line-height: 1.7;
          margin-bottom: 0.5rem;
          position: relative;
        }
        
        .section-list li:before {
          content: "•";
          color: #ff6b00;
          font-weight: bold;
          display: inline-block;
          width: 1em;
          margin-left: -1em;
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
          .privacy-policy-page {
            padding: 80px 0 30px;
          }
          
          .privacy-title {
            font-size: 2rem;
          }
          
          .privacy-content {
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
          .privacy-title {
            font-size: 1.8rem;
          }
          
          .breadcrumb-nav {
            font-size: 0.8rem;
          }
          
          .privacy-content {
            padding: 1.2rem;
          }
          
          .section-number {
            width: 25px;
            height: 25px;
            font-size: 0.8rem;
            margin-right: 0.8rem;
          }
        }


        
/* buttom to top button */

            .scroll-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
          color: white;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.3s ease;
          z-index: 1000;
        }
        
        .scroll-top-btn:hover {
          background: linear-gradient(135deg, #ff6b00 0%, #e55e00 100%);
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
        
        @media (max-width: 768px) {
          .scroll-top-btn {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}