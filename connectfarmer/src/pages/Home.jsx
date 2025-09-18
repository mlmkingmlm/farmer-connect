import React from 'react'
import About from '../components/About'
import Servicescompo from '../components/Servicescompo'
function Home() {
    return (
        <>
            {/* Start Carusel */}
            <div id="carouselExampleCaptions" className="carousel slide">
                <div className="carousel-indicators">
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={0}
                        className="active"
                        aria-current="true"
                        aria-label="Slide 1"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={1}
                        aria-label="Slide 2"
                    />
                    <button
                        type="button"
                        data-bs-target="#carouselExampleCaptions"
                        data-bs-slide-to={2}
                        aria-label="Slide 3"
                    />
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src='/images/1stslide.jpg' className="d-block w-100" style={{ height: "500px" }} alt="first-slide" />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>🌾 "Empowering Farmers with Technology for a Brighter Future"</h5>
                            <p>Get access to tools and resources that make farming easier, smarter, and more profitable.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/secondslide.jpg" className="d-block w-100" style={{ height: "500px" }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Track Your Farming Costs and Insurance in One Dashboard</h5>
                            <p>Manage your expenses, categories, and insurance details all in one simple platform.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="/images/3rdslide.jpg" className="d-block w-100" style={{ height: "500px" }} alt="..." />
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Join the Farmers Portal – Register Today, Grow Tomorrow</h5>
                            <p>Register in just a few steps and unlock a personalized dashboard built for farmers.</p>
                        </div>
                    </div>
                </div>
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                </button>
                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <About />
            <Servicescompo />
        </>
    )
}

export default Home
