import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/bookingPageStyle.css";

export default function BookingPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    homeAddress: '',
    city: '',
    state: '',
    zip: '',
    furnaceOrUnit: '',
    serviceType: serviceId || '',
    cleaningDate: '',
    cleaningTime: '',
    comment: ''
  });

  const [loading, setLoading] = useState(false);

  const services = {
    'air-duct-cleaning': 'Air Duct Cleaning',
    'dryer-vent-cleaning': 'Dryer Vent Cleaning',
    'supply-vent-cleaning': 'Supply Vent Cleaning',
    'negative-pressure-machine': 'Negative Pressure Machine',
    'brush-cleaning': 'Brush Cleaning',
    'deep-cleaning': 'Deep Cleaning',
    'chimney-cleaning': 'Chimney Cleaning',
    'hvac-system-cleaning': 'HVAC System Cleaning'
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
    'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
    'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        alert('Booking submitted successfully! We will contact you soon.');
        navigate('/thank-you');
      } else {
        throw new Error('Failed to submit booking');
      }
    } catch (error) {
      alert('Error submitting booking. Please try again.');
      console.error('Booking error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            {/* Header */}
            <div className="booking-header text-center">
              <h1>Schedule Your Service</h1>
              <p>Complete the form below to book your {services[serviceId] || 'cleaning'} service</p>
            </div>

            {/* Booking Form */}
            <div className="booking-form-container">
              <form onSubmit={handleSubmit} className="booking-form">
                {/* Personal Information */}
                <div className="form-section">
                  <h4>Personal Information</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your first name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Contact Number *</label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          required
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="form-section">
                  <h4>Address Information</h4>
                  <div className="form-group">
                    <label>Home Address *</label>
                    <input
                      type="text"
                      name="homeAddress"
                      value={formData.homeAddress}
                      onChange={handleChange}
                      required
                      placeholder="Enter your complete address"
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          placeholder="Enter your city"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>State *</label>
                        <select
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select State</option>
                          {states.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>ZIP Code *</label>
                        <input
                          type="text"
                          name="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                          placeholder="Enter ZIP code"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Service Information */}
                <div className="form-section">
                  <h4>Service Details</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Furnace / AC Unit Type *</label>
                        <input
                          type="text"
                          name="furnaceOrUnit"
                          value={formData.furnaceOrUnit}
                          onChange={handleChange}
                          required
                          placeholder="e.g., Furnace, AC Unit, etc."
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Service Type *</label>
                        <select
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Service</option>
                          {Object.entries(services).map(([id, name]) => (
                            <option key={id} value={id}>{name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Preferred Cleaning Date *</label>
                        <input
                          type="date"
                          name="cleaningDate"
                          value={formData.cleaningDate}
                          onChange={handleChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Preferred Time *</label>
                        <select
                          name="cleaningTime"
                          value={formData.cleaningTime}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Time</option>
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="form-section">
                  <h4>Additional Information</h4>
                  <div className="form-group">
                    <label>Comments or Special Instructions</label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleChange}
                      placeholder="Any special instructions or additional information"
                      rows="4"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-book"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="spinner-border spinner-border-sm me-2" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-calendar-check me-2"></i>
                      Confirm Booking
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="booking-contact-info">
              <h4>Need Immediate Assistance?</h4>
              <div className="contact-items">
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <span>Call us: 0019-0022002</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <span>Email: info@trueairducts.com</span>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <span>Available: Mon-Sat, 8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}