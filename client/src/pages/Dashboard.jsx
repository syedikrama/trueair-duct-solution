

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/dashboardStyle.css";
import ServiceForm from "../pages/ServiceForm";
import axios from "axios";
import { io } from "socket.io-client";
// import api from './Config';

export default function Dashboard() {
  let navigate = useNavigate();
  let [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0
  });

  let [recentBookings, setRecentBookings] = useState([]);
  let [allBookings, setAllBookings] = useState([]);
  let [loading, setLoading] = useState(true);
  let [activeTab, setActiveTab] = useState('overview');
  let [customers, setCustomers] = useState([]); // ✅ New state for customers
  let [selectedCustomer, setSelectedCustomer] = useState(null);
  let [showCustomerModal, setShowCustomerModal] = useState(false);

  let [showForm, setShowForm] = useState(false);
  let [editingService, setEditingService] = useState(null);
  let [services, setServices] = useState([]);
  let [selectedBooking, setSelectedBooking] = useState(null);
  let [showBookingModal, setShowBookingModal] = useState(false);

  // Socket.io connection for real-time updates
  useEffect(() => {
    let socket = io("");
    socket.on("newBooking", (booking) => {
      setAllBookings(prev => [booking, ...prev]);
      setRecentBookings(prev => [booking, ...prev].slice(0, 5));
      updateStats([booking, ...allBookings]);
    });
    return () => socket.disconnect();
  }, [allBookings]);
  // Fetch all data on load
  useEffect(() => {
    let fetchDashboardData = async () => {
      try {
        let bookingsRes = await axios.get("/api/bookings");
        setAllBookings(bookingsRes.data);
        setRecentBookings(bookingsRes.data.slice(0, 5));
        updateStats(bookingsRes.data);

        // ✅ Extract unique customers from bookings
        let uniqueCustomers = [];
        let seenEmails = new Set();
        bookingsRes.data.forEach(b => {
          if (!seenEmails.has(b.email)) {
            seenEmails.add(b.email);
            uniqueCustomers.push({
              name: `${b.firstName} ${b.lastName}`,
              email: b.email,
              phone: b.contactNumber,
              address: `${b.homeAddress}, ${b.city}, ${b.state}, ${b.zip}`,
              totalBookings: bookingsRes.data.filter(x => x.email === b.email).length
            });
          }
        });
        setCustomers(uniqueCustomers);

        // ✅ Services fetch
        let servicesRes = await axios.get("/api/services");
        setServices(servicesRes.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  let updateStats = (bookings) => {
    let totalBookings = bookings.length;
    let pendingBookings = bookings.filter(b => b.status === 'pending').length;
    let completedBookings = bookings.filter(b => b.status === 'completed').length;
    let totalRevenue = bookings.reduce((sum, b) => sum + (b.estimatedPrice || 0), 0);
    setStats({ totalBookings, pendingBookings, completedBookings, totalRevenue });
  };

  let getStatusBadge = (status) => {
    let statusClasses = {
      pending: 'status-pending',
      confirmed: 'status-confirmed',
      completed: 'status-completed',
      cancelled: 'status-cancelled'
    };
    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

// for log out
    let handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    };

  // View Booking Details
  let handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  // Edit Booking - Redirect to edit page
  let handleEditBooking = (bookingId) => {
    navigate(`/admin/bookings/edit/${bookingId}`);
  };

  let handleServiceAdded = (newService) => {
    setServices(prev => [newService, ...prev]);
    setShowForm(false);
  };

  let handleEditClick = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  let handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`/api/services/${id}`);
        setServices(prev => prev.filter(s => s._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete service.");
      }
    }
  };

  // Booking CRUD
  let handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`/api/bookings/${id}`);
        let updated = allBookings.filter(b => b._id !== id);
        setAllBookings(updated);
        setRecentBookings(updated.slice(0, 5));
        updateStats(updated);
      } catch (error) {
        console.error("Delete booking failed:", error);
        alert("Failed to delete booking.");
      }
    }
  };

  let handleUpdateStatus = async (id, status) => {
    try {
      let res = await axios.put(`/api/bookings/${id}/status`, { status });
      let updatedBookings = allBookings.map(b => b._id === id ? res.data.data : b);
      setAllBookings(updatedBookings);
      setRecentBookings(updatedBookings.slice(0, 5));
      updateStats(updatedBookings);
    } catch (error) {
      console.error("Update status failed:", error);
      alert("Failed to update booking status.");
    }
  };

  let handleViewCustomer = async (email) => {
    let bookingsOfCustomer = allBookings.filter(b => b.email === email);

    setSelectedCustomer({
      email,
      bookings: bookingsOfCustomer,
      name: `${bookingsOfCustomer[0].firstName} ${bookingsOfCustomer[0].lastName}`,
      phone: bookingsOfCustomer[0].contactNumber,
      address: `${bookingsOfCustomer[0].homeAddress}, ${bookingsOfCustomer[0].city}, ${bookingsOfCustomer[0].state}, ${bookingsOfCustomer[0].zip}`
    });
    setShowCustomerModal(true);
  };


  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }


  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's your business overview</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <div className="container">
          <div className="tabs">
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>
              <i className="fas fa-chart-pie"></i> Overview
            </button>
            <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
              <i className="fas fa-calendar"></i> Bookings
            </button>
            <button className={activeTab === 'services' ? 'active' : ''} onClick={() => setActiveTab('services')}>
              <i className="fas fa-concierge-bell"></i> Services
            </button>
            <button className={activeTab === 'customers' ? 'active' : ''} onClick={() => setActiveTab('customers')}>
              <i className="fas fa-users"></i> Customers
            </button>
            {/* className="btn btn-outline-danger" */}
            <button onClick={handleLogout} >
              <i className="fas fa-sign-out-alt me-2"></i>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content">
        <div className="container">

          {/* Stats */}
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-calendar-check"></i></div><div className="stat-info"><h3>{stats.totalBookings}</h3><p>Total Bookings</p></div></div>
            <div className="stat-card"><div className="stat-icon pending"><i className="fas fa-clock"></i></div><div className="stat-info"><h3>{stats.pendingBookings}</h3><p>Pending Bookings</p></div></div>
            <div className="stat-card"><div className="stat-icon completed"><i className="fas fa-check-circle"></i></div><div className="stat-info"><h3>{stats.completedBookings}</h3><p>Completed</p></div></div>
            <div className="stat-card"><div className="stat-icon revenue"><i className="fas fa-dollar-sign"></i></div><div className="stat-info"><h3>${stats.totalRevenue}</h3><p>Total Revenue</p></div></div>
          </div>

          {/* Recent Bookings / All Bookings */}
          {(activeTab === 'overview' || activeTab === 'bookings') && (
            <div className="recent-bookings">
              <div className="section-header">
                <h2>{activeTab === 'overview' ? "Recent Bookings" : "All Bookings"}</h2>
              </div>

              <div className="bookings-table">
                <table>
                  <thead>
                    <tr>
                      <th>Customer</th><th>Service</th><th>Date & Time</th><th>Amount</th><th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(activeTab === 'overview' ? recentBookings : allBookings).map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.firstName} {booking.lastName}</td>
                        <td>{booking.serviceType}</td>
                        <td>{new Date(booking.cleaningDate).toLocaleDateString()} <span className="time">{booking.cleaningTime}</span></td>
                        <td>${booking.estimatedPrice || 0}</td>
                        <td>{getStatusBadge(booking.status)}</td>
                        <td>
                          <button className="btn-view" onClick={() => handleViewBooking(booking)} title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn-edit" onClick={() => handleEditBooking(booking._id)} title="Edit Booking">
                            <i className="fas fa-edit"></i>
                          </button>
                          <button className="btn-delete" onClick={() => handleDeleteBooking(booking._id)} title="Delete Booking">
                            <i className="fas fa-trash"></i>
                          </button>
                          <select value={booking.status} onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quick Actions & Services Modal */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons-grid">
              <button className="action-btn" onClick={() => { setEditingService(null); setShowForm(true); }}>
                <i className="fas fa-plus"></i><span>Add New Service</span>
              </button>
              <button className="action-btn"><i className="fas fa-user-plus"></i><span>Add Staff Member</span></button>
              <button className="action-btn"><i className="fas fa-chart-bar"></i><span>Generate Report</span></button>
              <button className="action-btn"><i className="fas fa-cog"></i><span>Settings</span></button>
            </div>
          </div>

          {/* Service Form Modal */}
          {showForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="modal-close" onClick={() => setShowForm(false)}>✖</button>
                <ServiceForm onSuccess={handleServiceAdded} editingService={editingService} />
              </div>
            </div>
          )}

          {/* Booking Details Modal */}
          {showBookingModal && selectedBooking && (
            <div className="modal-overlay">
              <div className="modal-content">
                <button className="modal-close" onClick={() => setShowBookingModal(false)}>✖</button>
                <div className="booking-details">
                  <h2>Booking Details</h2>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <label>Customer:</label>
                      <span>{selectedBooking.firstName} {selectedBooking.lastName}</span>
                    </div>
                    <div className="detail-item">
                      <label>Email:</label>
                      <span>{selectedBooking.email}</span>
                    </div>
                    <div className="detail-item">
                      <label>Phone:</label>
                      <span>{selectedBooking.contactNumber}</span>
                    </div>
                    <div className="detail-item">
                      <label>Service:</label>
                      <span>{selectedBooking.serviceType}</span>
                    </div>
                    <div className="detail-item">
                      <label>Date & Time:</label>
                      <span>{new Date(selectedBooking.cleaningDate).toLocaleDateString()} at {selectedBooking.cleaningTime}</span>
                    </div>
                    <div className="detail-item">
                      <label>Address:</label>
                      <span>{selectedBooking.homeAddress}, {selectedBooking.city}, {selectedBooking.state} {selectedBooking.zip}</span>
                    </div>
                    <div className="detail-item">
                      <label>Unit Type:</label>
                      <span>{selectedBooking.furnaceOrUnit}</span>
                    </div>
                    <div className="detail-item">
                      <label>Units:</label>
                      <span>{selectedBooking.unitCount}</span>
                    </div>
                    <div className="detail-item">
                      <label>Price:</label>
                      <span>${selectedBooking.estimatedPrice}</span>
                    </div>
                    <div className="detail-item">
                      <label>Status:</label>
                      <span className={`status-badge ${selectedBooking.status}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                    {selectedBooking.comment && (
                      <div className="detail-item full-width">
                        <label>Comments:</label>
                        <span>{selectedBooking.comment}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="services-list">
              <h2>All Services</h2>
              <table>
                <thead>
                  <tr><th>Title</th><th>Price</th><th>Duration</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {services.map((s, index) => (
                    <tr key={s._id + index}>
                      <td>{s.title}</td>
                      <td>${s.price}</td>
                      <td>{s.duration}</td>
                      <td>
                        <button className="btn-edit" onClick={() => handleEditClick(s)}>Edit</button>
                        <button className="btn-delete" onClick={() => handleDeleteService(s._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <h2>All Customers</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Total Bookings</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c, index) => (
                    <tr key={index}>
                      <td>{c.name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.address}</td>
                      <td>{c.totalBookings}</td>
                      <td>
                        <button className="btn btn-primary"
                          onClick={() => handleViewCustomer(c.email)}>
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedCustomer && showCustomerModal && (
            <div className="modal-overlay">
              <div className="modal-content">   {/* yahan modal-content rakho */}
                <button className="modal-close" onClick={() => setShowCustomerModal(false)}>✖</button>
                <h2>Customer Details</h2>
                <p><strong>Name:</strong> {selectedCustomer.name}</p>
                <p><strong>Email:</strong> {selectedCustomer.email}</p>
                <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                <p><strong>Address:</strong> {selectedCustomer.address}</p>
                <hr />
                <h3>Booking History</h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Service</th>
                      <th>Status</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCustomer.bookings?.map((b, idx) => (
                      <tr key={idx}>
                        <td>{new Date(b.cleaningDate).toLocaleDateString()}</td>
                        <td>{b.serviceType}</td>
                        <td>{b.status}</td>
                        <td>${b.estimatedPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}



          {/* {activeTab === 'bookings' && (
            <div>
              <h2>All Bookings</h2>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((b) => (
                    <tr key={b._id}>
                      <td>{b.firstName} {b.lastName}</td>
                      <td>{b.serviceType}</td>
                      <td>{b.cleaningDate}</td>
                      <td>{getStatusBadge(b.status)}</td>
                      <td>${b.estimatedPrice}</td>
                      <td>
                        <button onClick={() => handleViewBooking(b)}>View</button>
                        <button onClick={() => handleEditBooking(b._id)}>Edit</button>
                        <button onClick={() => handleDeleteBooking(b._id)}>Delete</button>
                        <button onClick={() => handleUpdateStatus(b._id, 'confirmed')}>Confirm</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )} */}


        </div>
      </div>

      <style jsx>{`
        .booking-details {
          padding: 20px;
        }
        
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-top: 20px;
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        
        .detail-item label {
          font-weight: bold;
          color: #2c6b9e;
          margin-bottom: 5px;
        }
        
        .detail-item span {
          color: #6c757d;
        }
        
        .full-width {
          grid-column: 1 / -1;
        }
        
        .btn-view, .btn-edit, .btn-delete {
          padding: 5px 10px;
          margin: 0 2px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .btn-view { background: #e3f2fd; color: #1976d2; }
        .btn-edit { background: #fff3e0; color: #f57c00; }
        .btn-delete { background: #ffebee; color: #d32f2f; }
        
        .btn-view:hover, .btn-edit:hover, .btn-delete:hover {
          opacity: 0.8;
        }
 


        .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5); /* dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  color: #000;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  z-index: 1001;
  box-shadow: 0px 5px 20px rgba(0,0,0,0.3);
  animation: fadeIn 0.3s ease-in-out;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  position: absolute;
  top: 15px;
  right: 20px;
  cursor: pointer;
  color: #444;
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}


      `}</style>
    </div>
  );
}