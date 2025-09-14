import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/bookingPageStyle.css";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function BookingPage() {
  let { serviceId } = useParams();
  let navigate = useNavigate();
  let [formData, setFormData] = useState({
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
    unitCount: 1,
    cleaningDate: '',
    cleaningTime: '',
    comment: ''
  });

  let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  let [loading, setLoading] = useState(false);
  let [servicePrices, setServicePrices] = useState({});
  let [calculatedPrice, setCalculatedPrice] = useState(0);
  let [originalPrice, setOriginalPrice] = useState(0);
  let [discount, setDiscount] = useState(0);
  let [minDate, setMinDate] = useState('');

  let services = {
    'air-duct-cleaning': 'Air Duct Cleaning',
    'dryer-vent-cleaning': 'Dryer Vent Cleaning',
    'supply-vent-cleaning': 'Supply Vent Cleaning',
    'negative-pressure-machine': 'Negative Pressure Machine',
    'brush-cleaning': 'Brush Cleaning',
    'deep-cleaning': 'Deep Cleaning',
    'chimney-cleaning': 'Chimney Cleaning',
    'hvac-system-cleaning': 'HVAC System Cleaning'
  };

  // Discount structure: { unitCount: discountPercentage }
  let discountTiers = {
    1: 0,    // No discount for 1 unit
    2: 25,   // 25% discount for 2 units
    3: 30,   // 30% discount for 3 units
    4: 35,   // 35% discount for 4+ units
  };

  let timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  let states = [
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

  // Calculate minimum date (tomorrow)
  useEffect(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day
    setMinDate(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Saturday disable karne ke liye function
  let isSaturdayDisabled = (dateString) => {
    let [year, month, day] = dateString.split('-').map(Number);
    let date = new Date(year, month - 1, day); // Month 0-indexed
    return date.getDay() === 6; // Saturday
  };



  // Calculate price based on unit count
  let calculatePrice = (basePrice, units) => {
    let unitCount = Math.max(1, Math.min(10, Number(units)));
    let discountPercentage = discountTiers[unitCount];

    if (discountPercentage === undefined) {
      discountPercentage = unitCount >= 4 ? discountTiers[4] : 0;
    }

    let totalBasePrice = basePrice * unitCount;
    let discountAmount = (totalBasePrice * discountPercentage) / 100;
    let finalPrice = totalBasePrice - discountAmount;

    return {
      original: totalBasePrice,
      discounted: finalPrice,
      discount: discountAmount,
      unitCount: unitCount,
      discountPercent: discountPercentage
    };
  };

  useEffect(() => {
    let fetchServicePrices = async () => {
      try {
        let fixedPrices = {
          'air-duct-cleaning': 199,
          'dryer-vent-cleaning': 99,
          'supply-vent-cleaning': 149,
          'negative-pressure-machine': 249,
          'brush-cleaning': 179,
          'deep-cleaning': 299,
          'chimney-cleaning': 199,
          'hvac-system-cleaning': 349
        };
        setServicePrices(fixedPrices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchServicePrices();
  }, []);

  // Update price when service type or unit count changes
  useEffect(() => {
    if (formData.serviceType && servicePrices[formData.serviceType]) {
      let basePrice = servicePrices[formData.serviceType];
      let calculation = calculatePrice(basePrice, formData.unitCount);

      setCalculatedPrice(calculation.discounted);
      setOriginalPrice(calculation.original);
      setDiscount(calculation.discount);
    }
  }, [formData.serviceType, formData.unitCount, servicePrices]);

  // Date input ke liye custom handler
  let handleDateChange = (e) => {
    let selectedDate = e.target.value;

    if (isSaturdayDisabled(selectedDate)) {
      alert('Sorry, we are closed on Saturdays. Please choose another day.');
      setFormData({
        ...formData,
        cleaningDate: '' // Clear the selected date
      });
      return;
    }

    setFormData({
      ...formData,
      cleaningDate: selectedDate
    });
  };

  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'unitCount' ? parseInt(value, 10) || 1 : value
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    // Saturday check on submission
    if (formData.cleaningDate && isSaturdayDisabled(formData.cleaningDate)) {
      alert('Sorry, we are closed on Saturdays. Please choose another day.');
      return;
    }

    setLoading(true);

    try {
      let bookingData = {
        ...formData,
        estimatedPrice: calculatedPrice,
        originalPrice: originalPrice,
        discountAmount: discount,
        unitCount: formData.unitCount,
        timeZone: userTimeZone
      };

      let response = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
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
            <div className="booking-header text-center">
              <h1>Schedule Your Service</h1>
              <p>Complete the form below to book your {services[serviceId] || 'cleaning'} service</p>
            </div>

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

                  {/* Unit Count Selection */}
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Number of Units *</label>
                        <select
                          name="unitCount"
                          value={formData.unitCount}
                          onChange={handleChange}
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>
                              {num} Unit{num > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                        <small>Select the number of units needing service</small>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Price Display */}
                  {formData.serviceType && servicePrices[formData.serviceType] && (
                    <div className="price-display-card">
                      <div className="price-breakdown">
                        <div className="price-row">
                          <span>Base Price ({formData.unitCount} unit{formData.unitCount > 1 ? 's' : ''}):</span>
                          <span>${originalPrice.toFixed(2)}</span>
                        </div>

                        {discount > 0 && (
                          <div className="price-row discount">
                            <span>Discount ({discountTiers[formData.unitCount]}%):</span>
                            <span>-${discount.toFixed(2)}</span>
                          </div>
                        )}

                        <div className="price-row total">
                          <span><strong>Total Price:</strong></span>
                          <span><strong>${calculatedPrice.toFixed(2)}</strong></span>
                        </div>
                      </div>

                      {discount > 0 && (
                        <div className="discount-badge">
                          <i className="fas fa-tag"></i>
                          You save ${discount.toFixed(2)}!
                        </div>
                      )}
                    </div>
                  )}

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Preferred Cleaning Date *</label>

                        <DatePicker
                          selected={formData.cleaningDate ? new Date(formData.cleaningDate) : null}
                          onChange={(date) => {
                            setFormData({
                              ...formData,
                              cleaningDate: date ? date.toLocaleDateString('en-CA') : ''
                            });
                          }}
                          minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                          filterDate={(date) => date.getDay() !== 6}
                          placeholderText="Select date (Monday-Friday only)"
                          dateFormat="yyyy-MM-dd"
                          required
                          className="custom-datepicker form-control"
                          isClearable
                          wrapperClassName="datepicker-wrapper"
                        />




                        <small className="date-note">
                          * Service can be booked starting from tomorrow (Saturdays closed)
                        </small>
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

                          wrapperClassName="datepicker-wrapper"
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
                  <span>Available: Mon-Fri, 8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .price-display-card {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 10px;
          border: 2px dashed #dee2e6;
          margin: 1rem 0;
        }
        
        .price-breakdown {
          margin-bottom: 1rem;
        }
        
        .price-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          padding: 0.25rem 0;
        }
        
        .price-row.discount {
          color: #28a745;
          font-weight: 600;
        }
        
        .price-row.total {
          border-top: 2px solid #dee2e6;
          padding-top: 0.75rem;
          margin-top: 0.5rem;
          font-size: 1.2rem;
        }
        
        .discount-badge {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          text-align: center;
          margin-top: 1rem;
        }
        
        .discount-badge i {
          margin-right: 0.5rem;
        }
        
        .date-note {
          color: #6c757d;
          font-style: italic;
          margin-top: 0.5rem;
          display: block;
        }
          /* Custom styling for DatePicker */
  .datepicker-wrapper {
    width: 100%;
  }
  
  .custom-datepicker {
    height: 48px !important; /* ✅ Height increase karo */
    font-size: 16px !important;
    padding: 0.75rem 1rem !important;
  }
  
  /* React DatePicker ki default styling improve karo */
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker__input-container input {
    width: 100%;
    height: 48px;
    padding: 0.75rem 1rem;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .react-datepicker__input-container input:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
        
        @media (max-width: 768px) {
          .price-row {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}