import React from 'react'
import '../styles/contactStyle.css'

export default function Contact() {
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
                    <p>0019-0022002</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Email</h5>
                    <p>info@trueairducts.com</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Address</h5>
                    <p>123 Clean Air Street, City, State 12345</p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="contact-text">
                    <h5>Business Hours</h5>
                    <p>Mon-Sat: 8:00 AM - 8:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="contact-form-container">
              <h3>Send us a Message</h3>
              <form 
            //   onSubmit={handleSubmit} 
              className="contact-form">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    // value={formData.name}
                    // onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    // value={formData.phone}
                    // onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <select
                    name="service"
                    // value={formData.service}
                    // onChange={handleChange}
                    required
                  >
                    <option value="">Select Service</option>
                    <option value="residential">Residential Cleaning</option>
                    <option value="commercial">Commercial Cleaning</option>
                    <option value="dryer-vent">Dryer Vent Cleaning</option>
                    <option value="hvac">HVAC System Cleaning</option>
                    <option value="other">Other Services</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    // value={formData.message}
                    // onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="submit-btn">
                  Send Message <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
  )
}
