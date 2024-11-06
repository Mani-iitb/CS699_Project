import BookTicket from "./bookTicket";
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation, redirect, useNavigate} from 'react-router-dom';
import ShowHistory from "./history";

function MainComponent() {
    const [showBookTicket, setShowBookTicket] = useState(false);

    const handleOpenBookTicket = () => {
        setShowBookTicket(true);
    };

    const handleCloseBookTicket = () => {
        setShowBookTicket(false);
    };
    const handleLogin=(e)=>{

    }
    return (
        <div>
            <h1>Main Component</h1>
            <button onClick={handleOpenBookTicket}>Book Ticket</button>

            {showBookTicket && <ShowHistory email="kartik@example.com"/>
            }
                
            
        </div>
    );
}
{/* <BookTicket 
                    email="kartik@example.com"
                    flight_name="Flight 102"
                    flight_date="2024-11-15"
                    departure_time="10:00 AM"
                    source_city="New York"
                    destination_city="Los Angeles"
                    onClose={handleCloseBookTicket}
                   
                /> */}

export default MainComponent;
