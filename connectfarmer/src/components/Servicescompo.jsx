import React from 'react'
import { Link } from 'react-router-dom'

function Servicescompo() {
    return (
        <>
  {/* Services Start */}
  <div className="container-fluid py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-4 col-md-6">
          <div className="mb-3">
            <h6 className="text-primary text-uppercase">Services</h6>
            <h1 className="display-5 fw-bold">Our Farm Services</h1>
          </div>
          <p className="mb-4">
            We provide a complete range of farming solutions including fresh produce, modern equipment, expert crop guidance, and financial support to help farmers grow better and live better.
          </p>
          <Link href="" className="btn btn-primary py-md-3 px-md-5">
            Contact Us
          </Link>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-carrot display-1 text-primary mb-3" />
            <h4>Unique Features</h4>
            <p className="mb-0">
              Our FarmerConnect System can provide a unique features to improve your farm grow
                and yield better crops.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-solid fa-cloud display-1 text-primary mb-3" />
            <h4>Weather Info</h4>
            <p className="mb-0">
              Get real-time weather updates and forecasts to help you plan your farming activities and protect your crops.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-tachometer-alt display-1 text-primary mb-3" />
            <h4>Unique Dashboard</h4>
            <p className="mb-0">
               Access a smart dashboard to monitor farm activities, analyze costs, and manage insurance—all in one place.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-tractor display-1 text-primary mb-3" />
            <h4> Farming Insurance</h4>
            <p className="mb-0">
              Protect your crops and livestock with comprehensive insurance plans designed to safeguard your farm against unexpected losses.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="service-item bg-light text-center p-5">
            <i className="fa fa-seedling display-1 text-primary mb-3" />
            <h4>Farming Plans</h4>
            <p className="mb-0">
              Get personalized farming plans and expert guidance to maximize your crop yield, improve efficiency, and boost profits.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Services End */}
</>
    )
}

export default Servicescompo
