// Services.js
import { Link } from "react-router-dom";
import "../styles/servicesStyle.css"; // Import the CSS file

export default function Services() {
  return (
    <div>
      {/* Header Section */}
      <header className="services-header">
        <div className="container">
          <h1>Our Air Duct Services</h1>
          <p>Professional cleaning solutions for healthier indoor air quality and improved HVAC efficiency</p>
        </div>
      </header>

      {/* Services Grid */}
      <div className="services-container">
        <div className="container">
          <div className="row g-4">
            {/* Service 1 */}
            <div className="col-md-4">
              <div className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                  className="card-img-top service-img" 
                  alt="Residential Air Duct Cleaning"
                />
                <div className="service-card-body">
                  <h5 className="service-title">Residential Air Duct Cleaning</h5>
                  <p className="service-text">
                    Thorough cleaning of home ventilation systems to remove dust, allergens, and improve indoor air quality.
                  </p>
                  <Link to="/services/residential" className="service-btn">Read More</Link>
                </div>
              </div>
            </div>

            {/* Service 2 */}
            <div className="col-md-4">
              <div className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1632773689822-3c30d5051f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y29tbWVyY2lhbCUyMGh2YWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
                  className="card-img-top service-img" 
                  alt="Commercial Duct Cleaning"
                />
                <div className="service-card-body">
                  <h5 className="service-title">Commercial Duct Cleaning</h5>
                  <p className="service-text">
                    Professional cleaning for office buildings, restaurants, and commercial facilities to maintain healthy air quality.
                  </p>
                  <Link to="/services/commercial" className="service-btn">Read More</Link>
                </div>
              </div>
            </div>

            {/* Service 3 */}
            <div className="col-md-4">
              <div className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1632882001413-801bf290a87c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRyeWVyJTIwdmVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" 
                  className="card-img-top service-img" 
                  alt="Dryer Vent Cleaning"
                />
                <div className="service-card-body">
                  <h5 className="service-title">Dryer Vent Cleaning</h5>
                  <p className="service-text">
                    Prevent fire hazards and improve dryer efficiency with our professional dryer vent cleaning service.
                  </p>
                  <Link to="/services/dryer-vent" className="service-btn">Read More</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4 mt-4">
            {/* Service 4 */}
            <div className="col-md-4">
              <div className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1616604744535-5b9e9785f77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGh2YWMlMjBzeXN0ZW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=600&q=60" 
                  className="card-img-top service-img" 
                  alt="HVAC System Cleaning"
                />
                <div className="service-card-body">
                  <h5 className="service-title">HVAC System Cleaning</h5>
                  <p className="service-text">
                    Comprehensive cleaning of your entire HVAC system to improve efficiency and extend its lifespan.
                  </p>
                  <Link to="/services/hvac" className="service-btn">Read More</Link>
                </div>
              </div>
            </div>

            {/* Service 5 */}
            <div className="col-md-4">
              <div className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                  className="card-img-top service-img" 
                  alt="Mold Remediation"
                />
                <div className="service-card-body">
                  <h5 className="service-title">Mold Remediation</h5>
                  <p className="service-text">
                    Professional mold inspection and removal services to ensure a safe and healthy indoor environment.
                  </p>
                  <Link to="/services/mold" className="service-btn">Read More</Link>
                </div>
              </div>
            </div>

            {/* Service 6 */}
            <div className="col-md-4">
              <div className="service-card">
                <img 
                  src="https://images.unsplash.com/photo-1581578021517-ba0feb3d0c38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyJTIwZHVjdCUyMGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60" 
                  className="card-img-top service-img" 
                  alt="Air Quality Testing"
                />
                <div className="service-card-body">
                  <h5 className="service-title">Air Quality Testing</h5>
                  <p className="service-text">
                    Comprehensive air quality assessment to identify pollutants and recommend appropriate solutions.
                  </p>
                  <Link to="/services/air-quality" className="service-btn">Read More</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}