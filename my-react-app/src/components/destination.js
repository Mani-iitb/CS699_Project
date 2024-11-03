// Destinations.js

import React from "react";
import { useNavigate } from 'react-router-dom';
import "./destination.css";
import myImage1 from '../images/Mumbai.jpg';
import myImage2 from "../images/kolkata.jpg";
import myImage3 from "../images/banglore.jpg";
import myImage4 from "../images/hyderabad.jpg";
import myImage5 from "../images/delhi.jpg";
import myImage6 from "../images/chennai.jpg";
import myImage7 from "../images/ahmdabad.jpg"
import myImage8 from "../images/goa.jpg";
import myImage9 from "../images/lucknow.jpg";
import myImage10 from "../images/pune.jpg";
import myImage11 from "../images/crousel1.png";
import myImage12 from "../images/crousel2.png";
import myImage13 from "../images/crousel3.png";
import backImg from "../images/DestBackImg.avif";

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
        city: "Bangalore",
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
        text: "Chennai, known as the Gateway to South India, is a vibrant city for its rich cultural heritage and stunning coastline. Explore the majestic temples, relax on Marina Beach, and savor the delicious flavors of South Indian cuisine in this metropolis"
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
        city: "Lucknow",
        text: "Lucknow, the city of Nawabs, is known for its rich history, stunning architecture, and delicious Awadhi cuisine. Explore the grandeur of the Bara Imambara and the intricate beauty of the Rumi Darwaza. Immerse yourself in the city's vibrant culture and warm hospitality."
    },
    {
        id: 10,
        imgsrc: myImage10,
        city: "Pune",
        text: "Pune, a vibrant city known as the 'Oxford of the East,' boasts a blend of modernity and tradition. Home to numerous educational institutions and lush green spaces, it offers a rich cultural experience. Discover the historic Aga Khan Palace and enjoy the city's thriving food scene"
    },
];

function Destinations(event){
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url('${backImg}')`;
    const navigate = useNavigate();

    const handleClick = (city) => {
        navigate('/', { state : { dest : city }});
    }

    return (
        <div>
            <div className="card-container">
                {cardData.map((card) => 
                <div key={card.id} className="card" style={{ width: '21rem', margin: '10px' }}>
                    <img src={card.imgsrc} className="card-img-top" alt={`Image of ${card.city}`} />
                    <div className="card-body">
                        <h5 className="card-title">{card.city}</h5>
                        <p className="card-text">{card.text}</p>
                        <div className="button">
                        <button className="btn btn-primary" onClick={() => handleClick(card.city)}>Book Tickets</button>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
}

export default Destinations;
