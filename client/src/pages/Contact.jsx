import React, { useEffect, useState } from 'react'
import '../styles/contactStyle.css'

export default function Contact() {
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



  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
        console.error('Server error:', data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Auto-hide status messages after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div>
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="contact-info">
                <h2>Get In Touch</h2>
                <p className="contact-description">
                  Have questions about our air duct cleaning services? Fill out the form and our team will get back to you within 24 hours.
                </p>
                
                <div className="contact-details">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-phone"></i>
                    </div>
                    <div className="contact-text">
                      <h5>Phone</h5>
                      <p>(463) 227-5480</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="contact-text">
                      <h5>Email</h5>
                      <p>trueairduct881@gmail.com.com</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div className="contact-text">
                      <h5>Address</h5>
                      <p>Charlotte, North Carolina, 28202</p>
                    </div>
                  </div>
                  
                  <div className="contact-item">
                    <div className="contact-icon">
                      <i className="fas fa-clock"></i>
                    </div>
                    <div className="contact-text">
                      <h5>Business Hours</h5>
                      <p>Mon-Sun: 7:00 AM - 7:00 PM Sat-Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6">
              <div className="contact-form-container">
                <h3>Send us a Message</h3>
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Service</option>
                      <option value="Residential Cleaning">Air Duct Cleaning</option>
                      <option value="Residential Cleaning">Supply Vent Cleaning</option>
                      <option value="Residential Cleaning">Dryer Vent Cleaning</option>
                      <option value="Residential Cleaning">Brush Cleaning</option>
                      <option value="Commercial Cleaning">Deep Cleaning</option>
                      <option value="Dryer Vent Cleaning">Chimney Cleaning</option>
                      <option value="HVAC System Cleaning">HVAC System Cleaning</option>
                      <option value="Other Services">Other Services</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <i className="fas fa-paper-plane ms-2"></i>
                      </>
                    )}
                  </button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="alert alert-success mt-3" role="alert">
                      <i className="fas fa-check-circle me-2"></i>
                      Message sent successfully! We'll get back to you soon.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="alert alert-danger mt-3" role="alert">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      Failed to send message. Please try again or contact us directly.
                    </div>
                  )}
                </form>
              </div>
            </div>
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

      <style jsx>{`
        .alert {
          border-radius: 8px;
          padding: 12px 16px;
          margin-top: 15px;
          border: none;
          font-weight: 500;
        }
        
        .alert-success {
          background-color: #d4edda;
          color: #0f5132;
        }
        
        .alert-danger {
          background-color: #f8d7da;
          color: #842029;
        }
        
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .spinner-border-sm {
          width: 1rem;
          height: 1rem;
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
  )
}