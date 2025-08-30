import React from 'react';

export default function Header() {
  return (
    <div className="header-topbar">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="topbar-contact">
              <i className="fas fa-phone-alt"></i>
              <span>Emergency Service: <strong>0019-0022002</strong></span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="topbar-timing">
              <i className="fas fa-clock"></i>
              <span>Business Hours: <strong>Mon-Sat: 8:00AM - 8:00PM</strong></span>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .header-topbar {
          background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
          color: white;
          padding: 12px 0;
          font-size: 14px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .topbar-contact, .topbar-timing {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .topbar-contact i, .topbar-timing i {
          margin-right: 8px;
          color: #ff6b00;
        }
        
        .topbar-contact strong, .topbar-timing strong {
          font-weight: 600;
          margin-left: 5px;
        }
        
        @media (max-width: 767.98px) {
          .header-topbar {
            padding: 8px 0;
          }
          
          .topbar-contact, .topbar-timing {
            justify-content: flex-start;
            margin-bottom: 5px;
          }
          
          .topbar-timing {
            margin-bottom: 0;
          }
        }
        
        @media (max-width: 575.98px) {
          .topbar-contact, .topbar-timing {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}