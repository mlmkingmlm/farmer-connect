import React from 'react'

function About() {
    return (
        <>
  {/* About Start */}
  <div className="container-fluid about pt-5">
    <div className="container">
      <div className="row gx-5">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="d-flex h-100 border border-5 border-primary border-bottom-0 pt-4">
            <img className="img-fluid mt-auto mx-auto" src="images/about.png" />
          </div>
        </div>
        <div className="col-lg-6 pb-5">
          <div className="mb-3 pb-2">
            <h6 className="text-primary text-uppercase">About Us</h6>
            <h1 className="display-5 fw-bold">
              Empowering Farmers for a Better Tomorrow
            </h1>
          </div>
          <p className="mb-4">
            Our Farmers Portal is built to support and uplift the farming community by offering digital tools and resources. From easy registration to managing farming costs and accessing insurance schemes, we ensure that farmers can grow with confidence and security.
          </p>
          <div className="row gx-5 gy-4">
            <div className="col-sm-6">
              <i className="fa fa-user-plus display-1 text-secondary ms-5" />
              <h4>Easy Registration</h4>
              <p className="mb-0">
                Quick and simple process to get started with your farming profile.
              </p>
            </div>
            <div className="col-sm-6">
              <i className="fa fa-tachometer-alt display-1 text-secondary ms-5" />
              <h4>Smart Dashboard</h4>
              <p className="mb-0">
                Track farming categories, costs, and insurance in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
</>

    )
}

export default About
