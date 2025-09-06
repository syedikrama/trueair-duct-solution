

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/dashboardStyle.css";
import ServiceForm from "../pages/ServiceForm";
import axios from "axios";
import { io } from "socket.io-client";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Socket.io connection for real-time updates
  useEffect(() => {
    const socket = io("http://localhost:3001");
    socket.on("newBooking", (booking) => {
      setAllBookings(prev => [booking, ...prev]);
      setRecentBookings(prev => [booking, ...prev].slice(0, 5));
      updateStats([booking, ...allBookings]);
    });
    return () => socket.disconnect();
  }, [allBookings]);

  // Fetch all data on load
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const bookingsRes = await axios.get("http://localhost:3001/api/bookings");
        setAllBookings(bookingsRes.data);
        setRecentBookings(bookingsRes.data.slice(0, 5));
        updateStats(bookingsRes.data);

        const servicesRes = await axios.get("http://localhost:3001/api/services");
        setServices(servicesRes.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const updateStats = (bookings) => {
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const completedBookings = bookings.filter(b => b.status === 'completed').length;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.estimatedPrice || 0), 0);
    setStats({ totalBookings, pendingBookings, completedBookings, totalRevenue });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
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

  // View Booking Details
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  // Edit Booking - Redirect to edit page
  const handleEditBooking = (bookingId) => {
    navigate(`/admin/bookings/edit/${bookingId}`);
  };

  const handleServiceAdded = (newService) => {
    setServices(prev => [newService, ...prev]);
    setShowForm(false);
  };

  const handleEditClick = (service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await axios.delete(`http://localhost:3001/api/services/${id}`);
        setServices(prev => prev.filter(s => s._id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete service.");
      }
    }
  };

  // Booking CRUD
  const handleDeleteBooking = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:3001/api/bookings/${id}`);
        const updated = allBookings.filter(b => b._id !== id);
        setAllBookings(updated);
        setRecentBookings(updated.slice(0, 5));
        updateStats(updated);
      } catch (error) {
        console.error("Delete booking failed:", error);
        alert("Failed to delete booking.");
      }
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/bookings/${id}/status`, { status });
      const updatedBookings = allBookings.map(b => b._id === id ? res.data.data : b);
      setAllBookings(updatedBookings);
      setRecentBookings(updatedBookings.slice(0, 5));
      updateStats(updatedBookings);
    } catch (error) {
      console.error("Update status failed:", error);
      alert("Failed to update booking status.");
    }
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
      `}</style>
    </div>
  );
}