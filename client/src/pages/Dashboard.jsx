import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/dashboardStyle.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0
  });

  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simulated data fetch
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call delay
        setTimeout(() => {
          setStats({
            totalBookings: 154,
            pendingBookings: 23,
            completedBookings: 89,
            totalRevenue: 12500
          });

          setRecentBookings([
            {
              id: 1,
              customerName: 'John Doe',
              service: 'Air Duct Cleaning',
              date: '2024-01-15',
              time: '10:00 AM',
              status: 'pending',
              amount: 199
            },
            {
              id: 2,
              customerName: 'Sarah Wilson',
              service: 'Dryer Vent Cleaning',
              date: '2024-01-14',
              time: '2:30 PM',
              status: 'completed',
              amount: 99
            },
            {
              id: 3,
              customerName: 'Mike Chen',
              service: 'HVAC System Cleaning',
              date: '2024-01-14',
              time: '11:00 AM',
              status: 'confirmed',
              amount: 299
            },
            {
              id: 4,
              customerName: 'Lisa Rodriguez',
              service: 'Commercial Cleaning',
              date: '2024-01-13',
              time: '9:00 AM',
              status: 'pending',
              amount: 399
            }
          ]);

          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

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

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Welcome back! Here's your business overview</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="dashboard-tabs">
        <div className="container">
          <div className="tabs">
            <button 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-chart-pie"></i> Overview
            </button>
            <button 
              className={activeTab === 'bookings' ? 'active' : ''}
              onClick={() => setActiveTab('bookings')}
            >
              <i className="fas fa-calendar"></i> Bookings
            </button>
            <button 
              className={activeTab === 'services' ? 'active' : ''}
              onClick={() => setActiveTab('services')}
            >
              <i className="fas fa-concierge-bell"></i> Services
            </button>
            <button 
              className={activeTab === 'customers' ? 'active' : ''}
              onClick={() => setActiveTab('customers')}
            >
              <i className="fas fa-users"></i> Customers
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="container">
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-calendar-check"></i>
              </div>
              <div className="stat-info">
                <h3>{stats.totalBookings}</h3>
                <p>Total Bookings</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon pending">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-info">
                <h3>{stats.pendingBookings}</h3>
                <p>Pending Bookings</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon completed">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="stat-info">
                <h3>{stats.completedBookings}</h3>
                <p>Completed</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue">
                <i className="fas fa-dollar-sign"></i>
              </div>
              <div className="stat-info">
                <h3>${stats.totalRevenue}</h3>
                <p>Total Revenue</p>
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="recent-bookings">
            <div className="section-header">
              <h2>Recent Bookings</h2>
              <Link to="/admin/bookings" className="view-all">
                View All <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

            <div className="bookings-table">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>
                        <div className="customer-info">
                          <div className="customer-name">{booking.customerName}</div>
                        </div>
                      </td>
                      <td>{booking.service}</td>
                      <td>
                        <div className="datetime">
                          <div>{booking.date}</div>
                          <div className="time">{booking.time}</div>
                        </div>
                      </td>
                      <td>${booking.amount}</td>
                      <td>{getStatusBadge(booking.status)}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-view" title="View Details">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn-edit" title="Edit Booking">
                            <i className="fas fa-edit"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons-grid">
              <button className="action-btn">
                <i className="fas fa-plus"></i>
                <span>Add New Service</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-user-plus"></i>
                <span>Add Staff Member</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-chart-bar"></i>
                <span>Generate Report</span>
              </button>
              <button className="action-btn">
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}