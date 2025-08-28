import React from 'react'
import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div>
            <div className="position-relative text-center">
                {/* Background Image */}
                <img
                    src="https://img.freepik.com/premium-photo/hvac-technician-cleaning-air-ducts-home-with-long-tools-vacuum-system_857340-18122.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Air Duct Cleaning"
                    className="img-fluid w-100"
                    style={{ maxHeight: "600px", objectFit: "cover" }}
                />

                {/* Dark Overlay + Flex Center */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white px-3"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <h1 className="fw-bold">Professional Air Duct Cleaning</h1>
                    <p className="lead">Keep your home fresh, safe, and healthy with our expert services.</p>
                    <Link to="/booking" className="btn btn-primary mt-3">
                        Book Now
                    </Link>
                </div>


            </div>

            {/* intro section  */}
           <div className="container my-3">
  {/* Section Heading */}
  <h2 className="text-center fw-bold mb-5">About Our Services</h2>

  <div className="row align-items-center">
    {/* Left Side - Text */}
    <div className="col-md-6">
      <h3 className="fw-bold">Why Choose Us?</h3>
      <p>
        We provide professional Air Duct Cleaning services to improve your
        indoor air quality, reduce allergens, and increase energy efficiency.
        Our expert team uses advanced equipment to ensure the best results for
        your home or office.
      </p>

      {/* Benefits List */}
      <ul className="list-unstyled mt-3">
        <li className="mb-2">
          <i className="fas fa-check-circle text-success me-2"></i>
          Professional & Experienced Team
        </li>
        <li className="mb-2">
          <i className="fas fa-check-circle text-success me-2"></i>
          Advanced Cleaning Equipment
        </li>
        <li className="mb-2">
          <i className="fas fa-check-circle text-success me-2"></i>
          Affordable & Transparent Pricing
        </li>
        <li className="mb-2">
          <i className="fas fa-check-circle text-success me-2"></i>
          100% Customer Satisfaction
        </li>
      </ul>
    </div>

    {/* Right Side - Image */}
    <div className="col-md-6 text-center">
      <img
        src="https://firstcallnc.com/wp-content/uploads/2019/12/Air-duct-cleaning-1024x587-1024x585.jpg"
        alt="Air Duct Cleaning"
        className="img-fluid rounded"
      />
    </div>
  </div>
</div>


        </div>
    )
}
