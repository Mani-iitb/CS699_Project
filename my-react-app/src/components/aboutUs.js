import React from 'react';


function AboutUs() {
    return (
        <>
            <div className="container my-5">
                <div className="text-center mb-5">
                    <h1 className="display-4">About Us</h1>
                    <p className="lead">
                        Welcome to our flight booking website! This project was developed as part of our course to simplify the flight booking process and provide an exceptional experience for travelers.
                    </p>
                </div>

                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h2 className="text-center mb-4">Our Mission</h2>
                        <p>
                            Our mission is to create a reliable and easy-to-use platform for booking flights. We aim to empower travelers to make informed choices with a seamless booking process, whether they are planning a business trip or a vacation.
                        </p>
                    </div>
                </div>

                <div className="text-center my-5">
                    <h2>Our Team</h2>
                    <div className="row text-center my-5">
                        <div className="col-sm-6 mb-3">
                            <div className="card">
                                <div className="card-body">
                                <i class="fa-solid fa-user-tie"></i>

                                    <h5 className="card-title">Team Member Name</h5>
                                    <p className="card-text">What work done in project</p>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="card">
                                <div className="card-body">
                                    <i class="fa-solid fa-user-tie"></i>
                                    <h5 className="card-title">Team Member Name</h5>
                                    <p className="card-text">What work done in project</p>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center my-5">
                    <h2>Contact Us</h2>
                    <ul className="list-unstyled">
                        <li>Email: <a href="mailto:support@flightbooking.com">support@flightbooking.com</a></li>
                        <li>Phone: +1 (123) 456-7890</li>
                        <li>Address: 123 Flight Booking Lane, Travel City</li>
                    </ul>
                </div>
            </div>

            <footer className="bg-dark text-light py-4 mt-5">
                <div className="container-fluid text-center">
                    <div className="mb-3">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
                            <i className="fab fa-facebook fa-2x"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
                            <i className="fab fa-twitter fa-2x"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
                            <i className="fab fa-instagram fa-2x"></i>
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-light mx-3">
                            <i className="fab fa-linkedin fa-2x"></i>
                        </a>
                    </div>
                    <p className="mb-0">© 2024 Airline Booking Website. All rights reserved.</p>
                    <small className="text-muted">Designed as a Course Project</small>
                </div>
            </footer>
        </>
    );
}

export default AboutUs;
