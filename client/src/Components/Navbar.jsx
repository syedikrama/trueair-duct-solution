// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [services, setServices] = useState([]);

//   useEffect(() => {
//     axios
//       .get("/api/services")
//       .then((res) => setServices(res.data))
//       .catch((err) => console.error("Error fetching services:", err));
//   }, []);

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
//         <div className="container">
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//         <i class="fa-regular fa-house"></i>
//             <span className="brand-text">TrueAir Duct Solutions</span>
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">
//                   <i className="fas fa-home me-1"></i> Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">
//                   <i className="fas fa-info-circle me-1"></i> About
//                 </Link>
//               </li>

//               {/* Services Dropdown */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   data-bs-toggle="dropdown"
//                 >
//                   <i className="fas fa-concierge-bell me-1"></i> Services
//                 </a>
//                 <ul className="dropdown-menu">
//                   {services.map((s) => (
//                     <li key={s._id}>
//                       <Link className="dropdown-item" to={`/services/${s._id}`}>
//                         {s.title}
//                       </Link>
//                     </li>
//                   ))}
//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/services">
//                       All Services
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/gallery">
//                   <i className="fas fa-images me-1"></i> Gallery
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">
//                   <i className="fas fa-phone me-1"></i> Contact
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/booking">
//                   <i className="fas fa-book me-1"></i> Booking
//                 </Link>
//               </li>
//             </ul>

//             {/* Search Box */}
//             {/* <form className="d-flex ms-lg-3">
//               <input
//                 className="form-control me-2 search-input"
//                 type="search"
//                 placeholder="Search services..."
//               />
//               <button className="btn btn-search" type="submit">
//                 <i className="fas fa-search"></i>
//               </button>
//             </form> */}
//           </div>
//         </div>

//         <style jsx>{`
//         .custom-navbar {
//           background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
//           box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//           padding: 0.5rem 1rem;
//         }
        
//         .navbar-brand {
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           margin-right: 1rem;
//         }
        
//         .navbar-logo {
//           height: 50px;
//           width: auto;
//           max-width: 100%;
//           object-fit: contain;
//           margin-right: 10px;
//         }
        
//         .brand-text {
//           font-size: 1.4rem;
//           color: white;
//         }
        
//         .nav-link {
//           color: rgba(255, 255, 255, 0.85) !important;
//           font-weight: 500;
//           padding: 0.8rem 1rem !important;
//           margin: 0 2px;
//           border-radius: 5px;
//           transition: all 0.3s ease;
//         }
        
//         .nav-link:hover, .nav-link.active {
//           color: white !important;
//           background-color: rgba(255, 255, 255, 0.15);
//           transform: translateY(-2px);
//         }
        
//         .dropdown-menu {
//           border: none;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           border-radius: 8px;
//           padding: 0.5rem;
//         }
        
//         .dropdown-item {
//           padding: 0.7rem 1.2rem;
//           border-radius: 5px;
//           transition: all 0.2s ease;
//         }
        
//         .dropdown-item:hover {
//           background-color: #f0f7ff;
//           color: #2c6b9e;
//         }
        
//         .btn-search {
//           background-color: #ff6b00;
//           color: white;
//           border: none;
//           border-radius: 5px;
//           padding: 0.5rem 1.2rem;
//           transition: all 0.3s ease;
//         }
        
//         .btn-search:hover {
//           background-color: #e55e00;
//           transform: translateY(-2px);
//         }
        
//         .search-input {
//           border-radius: 5px;
//           border: 1px solid rgba(255, 255, 255, 0.2);
//           background-color: rgba(255, 255, 255, 0.15);
//           color: white;
//         }
        
//         .search-input::placeholder {
//           color: rgba(255, 255, 255, 0.7);
//         }
        
//         .navbar-toggler {
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           padding: 0.4rem 0.6rem;
//         }
        
//         @media (max-width: 991.98px) {
//           .navbar-collapse {
//             background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
//             padding: 1rem;
//             border-radius: 8px;
//             margin-top: 0.5rem;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           }
          
//           .search-input {
//             margin-top: 1rem;
//           }
          
//           .navbar-logo {
//             height: 40px;
//           }
          
//           .brand-text {
//             font-size: 1.2rem;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .navbar-brand {
//             margin-right: 0.5rem;
//           }
          
//           .navbar-logo {
//             height: 35px;
//             margin-right: 8px;
//           }
          
//           .brand-text {
//             font-size: 1rem;
//           }
//         }
//       `}</style>
//       </nav>
//     </div>
//   );
// }












// import React, { useEffect, useState, useRef } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [services, setServices] = useState([]);
//   const navbarRef = useRef(null);

//   useEffect(() => {
//     axios
//       .get("/api/services")
//       .then((res) => setServices(res.data))
//       .catch((err) => console.error("Error fetching services:", err));
//   }, []);

//   // Close navbar when clicking outside, on scroll, or on link click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (navbarRef.current && !navbarRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     const handleScroll = () => {
//       setIsOpen(false);
//     };

//     const handleLinkClick = () => {
//       setIsOpen(false);
//     };

//     // Add event listeners
//     document.addEventListener("mousedown", handleClickOutside);
//     window.addEventListener("scroll", handleScroll);
    
//     // Add click event to all nav links
//     const navLinks = document.querySelectorAll(".nav-link, .dropdown-item");
//     navLinks.forEach(link => {
//       link.addEventListener("click", handleLinkClick);
//     });

//     // Cleanup function
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//       window.removeEventListener("scroll", handleScroll);
//       navLinks.forEach(link => {
//         link.removeEventListener("click", handleLinkClick);
//       });
//     };
//   }, []);

//   return (
//     <div ref={navbarRef}>
//       <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
//         <div className="container">
//           <Link className="navbar-brand d-flex align-items-center" to="/">
//             <i className="fa-solid fa-house-chimney me-2"></i>
//             <span className="brand-text">TrueAir Duct Solutions</span>
//           </Link>

//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsOpen(!isOpen)}
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
//             <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link" to="/">
//                   <i className="fas fa-home me-2"></i> Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">
//                   <i className="fas fa-info-circle me-2"></i> About
//                 </Link>
//               </li>

//               {/* Services Dropdown */}
//               <li className="nav-item dropdown">
//                 <a
//                   className="nav-link dropdown-toggle"
//                   href="#"
//                   role="button"
//                   onClick={(e) => e.preventDefault()}
//                 >
//                   <i className="fas fa-concierge-bell me-2"></i> Services
//                 </a>
//                 <ul className="dropdown-menu">
//                   {services.map((s) => (
//                     <li key={s._id}>
//                       <Link className="dropdown-item" to={`/services/${s._id}`}>
//                         {s.title}
//                       </Link>
//                     </li>
//                   ))}
//                   <li>
//                     <hr className="dropdown-divider" />
//                   </li>
//                   <li>
//                     <Link className="dropdown-item" to="/services">
//                       All Services
//                     </Link>
//                   </li>
//                 </ul>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/gallery">
//                   <i className="fas fa-images me-2"></i> Gallery
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/contact">
//                   <i className="fas fa-phone me-2"></i> Contact
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/booking">
//                   <i className="fas fa-book me-2"></i> Booking
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <style jsx>{`
//         .custom-navbar {
//           background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
//           box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//           padding: 0.8rem 1rem;
//         }
        
//         .navbar-brand {
//           font-weight: 700;
//           display: flex;
//           align-items: center;
//           margin-right: 1rem;
//         }
        
//         .brand-text {
//           font-size: 1.4rem;
//           color: white;
//           font-weight: 700;
//         }
        
//         .nav-link {
//           color: rgba(255, 255, 255, 0.9) !important;
//           font-weight: 500;
//           padding: 0.8rem 1rem !important;
//           margin: 0 2px;
//           border-radius: 5px;
//           transition: all 0.3s ease;
//         }
        
//         .nav-link:hover, .nav-link.active {
//           color: white !important;
//           background-color: rgba(255, 255, 255, 0.15);
//           transform: translateY(-2px);
//         }
        
//         .dropdown-menu {
//           border: none;
//           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           border-radius: 8px;
//           padding: 0.5rem;
//           background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
//         }
        
//         .dropdown-item {
//           padding: 0.7rem 1.2rem;
//           border-radius: 5px;
//           transition: all 0.2s ease;
//           color: rgba(255, 255, 255, 0.85);
//         }
        
//         .dropdown-item:hover {
//           background-color: rgba(255, 255, 255, 0.15);
//           color: white;
//         }
        
//         .dropdown-divider {
//           border-color: rgba(255, 255, 255, 0.2);
//         }
        
//         .navbar-toggler {
//           border: 1px solid rgba(255, 255, 255, 0.3);
//           padding: 0.4rem 0.6rem;
//           border-radius: 5px;
//         }
        
//         @media (max-width: 991.98px) {
//           .navbar-collapse {
//             background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
//             padding: 1rem;
//             border-radius: 8px;
//             margin-top: 0.5rem;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           }
          
//           .nav-link {
//             margin: 4px 0;
//             text-align: center;
//           }
          
//           .dropdown-menu {
//             text-align: center;
//             margin: 0.5rem auto;
//             width: 90%;
//           }
          
//           .brand-text {
//             font-size: 1.2rem;
//           }
//         }
        
//         @media (max-width: 576px) {
//           .navbar-brand {
//             margin-right: 0.5rem;
//           }
          
//           .brand-text {
//             font-size: 1.1rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState([]);
  const location = useLocation(); // route change detect ke liye

  useEffect(() => {
    axios
      .get("/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Navbar close function
  const handleClose = () => setIsOpen(false);

  // Scroll hone par navbar close
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Route change hone par navbar close
  useEffect(() => {
    handleClose();
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
      <div className="container">
        {/* <Link className="navbar-brand d-flex align-items-center" to="/">
          <i className="fa-regular fa-house"></i>
          <span className="brand-text">TrueAir Duct Solutions</span>
        </Link> */}
<Link className="navbar-brand d-flex align-items-center" to="/">
  {/* <i className="fa-regular fa-house"></i> */}  {/* Ye icon comment kar diya */}
  <img
    src="/logo.png"  // yahan apni image ka path do
    alt="TrueAir Logo"
    style={{ height: "40px", marginRight: "10px" }}
  />
  <span className="brand-text">TrueAir Duct Solutions</span>
</Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/" onClick={handleClose}>
                <i className="fas fa-home me-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" onClick={handleClose}>
                <i className="fas fa-info-circle me-1"></i> About
              </Link>
            </li>

            {/* Services Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-concierge-bell me-1"></i> Services
              </a>
              <ul className="dropdown-menu">
                {services.map((s) => (
                  <li key={s._id}>
                    <Link
                      className="dropdown-item"
                      to={`/services/${s._id}`}
                      onClick={handleClose}
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/services" onClick={handleClose}>
                    All Services
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/gallery" onClick={handleClose}>
                <i className="fas fa-images me-1"></i> Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" onClick={handleClose}>
                <i className="fas fa-phone me-1"></i> Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/booking" onClick={handleClose}>
                <i className="fas fa-book me-1"></i> Booking
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <style jsx>{`
        .custom-navbar {
          background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
          padding: 0.5rem 1rem;
        }
        .navbar-brand {
          font-weight: 700;
          display: flex;
          align-items: center;
          margin-right: 1rem;
        }
        .brand-text {
          font-size: 1.4rem;
          color: white;
        }
        .nav-link {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          padding: 0.8rem 1rem !important;
          margin: 0 2px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }
        .nav-link:hover,
        .nav-link.active {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
        }
        .dropdown-menu {
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 0.5rem;
        }
        .dropdown-item {
          padding: 0.7rem 1.2rem;
          border-radius: 5px;
          transition: all 0.2s ease;
        }
        .dropdown-item:hover {
          background-color: #f0f7ff;
          color: #2c6b9e;
        }
        .navbar-toggler {
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.4rem 0.6rem;
        }
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background: linear-gradient(135deg, #2c6b9e 0%, #1a4a75 100%);
            padding: 1rem;
            border-radius: 8px;
            margin-top: 0.5rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          }
          .brand-text {
            font-size: 1.2rem;
          }
        }
        @media (max-width: 576px) {
          .brand-text {
            font-size: 1rem;
          }
        }
      `}</style>
    </nav>
  );
}































