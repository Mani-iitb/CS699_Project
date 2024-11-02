// Destinations.js

import React from "react";
import "./destination.css";
import myImage1 from '../images/Mumbai.jpeg';
import myImage2 from "../images/kolkata.jpg";
import myImage3 from "../images/banglore.jpg";
import myImage4 from "../images/hyderabad.jpg";
import myImage5 from "../images/delhi.jpeg";
import myImage6 from "../images/chennai.jpg";
import myImage7 from "../images/ahmdabad.jpeg"
import myImage8 from "../images/goa.avif";
import myImage9 from "../images/lucknow.jpeg";
import myImage10 from "../images/pune.jpg";
import myImage11 from "../images/crousel1.png";
import myImage12 from "../images/crousel2.png";
import myImage13 from "../images/crousel3.png";

const cardData = [
    {
        id: 1,
        imgsrc: myImage1,
        city: "Mumbai",
        text: "Experience the vibrant energy of India’s financial capital, where the Bollywood film industry meets bustling markets and historic landmarks. Explore iconic sites like the Gateway of India and enjoy the rich cultural tapestry of this diverse metropolis."
    },
    {
        id: 2,
        imgsrc: myImage2,
        city: "Kolkata",
        text: "Immerse yourself in the artistic spirit of Kolkata, renowned for its colonial charm and thriving cultural scene. Savor its delicious street food, visit historic landmarks, and discover a city steeped in rich traditions and vibrant cultural festivals."
    },
    {
        id: 3,
        imgsrc: myImage3,
        city: "Banglore",
        text: "Known as the Silicon Valley of India, Bangalore is a vibrant city blending rich tradition and cutting-edge technology. Experience its lush green parks, bustling nightlife, amazing historic palaces, and a thriving booming tech innovation scene."
    },
    {
        id: 4,
        imgsrc: myImage4,
        city: "Hyderabad",
        text: "Known as the City of Pearls, Hyderabad is a vibrant mix of rich history and modernity. Famous for its stunning Charminar and delicious biryani, this city offers an enriching cultural experience with its bustling markets and historic sites."
    },
    {
        id: 5,
        imgsrc: myImage5,
        city: "Delhi",
        text: "Delhi, the bustling capital of India, is a city where ancient history meets contemporary life. From the iconic Red Fort and India Gate to the vibrant markets of Chandni Chowk, Delhi offers a diverse cultural experience rich in heritage and modernity"
    },
    {
        id: 6,
        imgsrc: myImage6,
        city: "Chennai",
        text: "Chennai, known as the Gateway to South India, is a vibrant city celebrated for its rich cultural heritage and stunning coastline. Explore the majestic temples, relax on Marina Beach, and savor the delicious flavors of South Indian cuisine in this bustling metropolis"
    },
    {
        id: 7,
        imgsrc: myImage7,
        city: "Ahmedabad",
        text: "Ahmedabad, a UNESCO World Heritage City, is known for its stunning architecture and vibrant culture. Explore the historic Sabarmati Ashram and indulge in delicious local cuisine. Experience a unique blend of tradition and modernity here."
    },
    {
        id: 8,
        imgsrc: myImage8,
        city: "Goa",
        text: "Relax on the stunning beaches of Goa, famous for their golden sands and vibrant nightlife. Enjoy water sports, beach shacks serving delicious seafood, and a unique blend of Indian and Portuguese culture that makes this destination unforgettable."
    },
    {
        id: 9,
        imgsrc: myImage9,
        city: "Lacknow",
        text: "Lucknow, the city of Nawabs, is known for its rich history, stunning architecture, and delicious Awadhi cuisine. Explore the grandeur of the Bara Imambara and the intricate beauty of the Rumi Darwaza. Immerse yourself in the city's vibrant culture and warm hospitality."
    },
    {
        id: 10,
        imgsrc: myImage10,
        city: "Pune",
        text: "Pune, a vibrant city known as the 'Oxford of the East,' boasts a blend of modernity and tradition. Home to numerous educational institutions and lush green spaces, it offers a rich cultural experience. Discover the historic Aga Khan Palace and enjoy the city's thriving food scene"
    },
];

function Destinations() {
    const cardElements = cardData.map((card) => (
        <div key={card.id} className="card" style={{ width: '18rem', margin: '10px' }}>
            <img src={card.imgsrc} className="card-img-top" alt={`Image of ${card.city}`} />
            <div className="card-body">
                <h5 className="card-title">{card.city}</h5>
                <p className="card-text">{card.text}</p>
                <div className="button">
                <a href="#" className="btn btn-primary">Book Tickets</a>
                <a href="#" className="btn btn-primary">More info</a>
                </div>

            </div>
        </div>
    ));

    return (
        <div>
            <div className="carousel-container">
                <div id="carouselExampleDark" className="carousel carousel-dark slide">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <img src={myImage11} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>The Great Taj</h5>
                                
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <img src={myImage12} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Golden Temple</h5>
                                
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src={myImage13} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Castle</h5>
                                
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className="card-container">
                {cardElements}
            </div>
        </div>

    );
}

export default Destinations;
