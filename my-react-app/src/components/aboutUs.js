import React from 'react';
import './aboutUs.css';
import person from "../images/person.png"
import aboutbackImg from "../images/aboutus_bck.jpg"


function AboutUs() {
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url('${aboutbackImg}')`;
    return (
        <>
            <div className="container" >
                <div className="text-center">
                    <h1 className="display-4">About Us</h1>
                    <p>
                        Welcome to our flight booking website! This project was developed as part of our course to simplify the flight booking process and provide an exceptional experience for travelers.
                    </p>
                </div>
                <div className="row">
                    <div>
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to create a reliable and easy-to-use platform for booking flights. We aim to empower travelers to make informed choices with a seamless booking process, whether they are planning a business trip or a vacation.
                        </p>
                    </div>
                </div>

                <div class="team">
                    <h2>Our Team</h2>
                    <div >
                        <div class="member1">
                            <div className="card">
                                <img class="personImg" src={person}></img>
                                <div className="card-body">
                                    <h5 className="card-title">Manivannan N</h5>
                                    <p className="card-text">24m0796</p>
                                </div>
                            </div>
                        </div>
                        <div class="member2">
                            <div className="card">
                                <img class="personImg" src={person}></img>
                                <div className="card-body">
                                    <h5 className="card-title">Kartik Patel</h5>
                                    <p className="card-text">24m0777</p>
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
