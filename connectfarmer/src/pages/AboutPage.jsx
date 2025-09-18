import React from 'react'
import About from '../components/About'
import { Link } from 'react-router-dom'

function AboutPage() {
    return (
        <>
            {/* Hero Start */}
            <div className="container-fluid bg-success py-5 bg-hero mb-5">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center text-lg-start">
                            <h1 className="display-1 text-white mb-md-4 text-center">About Us</h1>
                            <div className=' d-flex justify-content-center'>
                                <Link to="/" className="btn btn-primary py-md-3 px-md-5 me-3">
                                    Home
                                </Link>
                                <Link to="/about" className="btn btn-secondary py-md-3 px-md-5">
                                    About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Hero End */}
            <About />
        </>

    )
}

export default AboutPage
