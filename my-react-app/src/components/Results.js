import React, { useEffect } from 'react'
import { useState } from 'react';
import "./Results.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Results({flights}) {
    const [sortOn, setSortOn] = useState("price");
    const [res, setResults] = useState(flights);
    const [isBooking, setisBooking] = useState("Third Party");
    const token = localStorage.getItem("token");
    const [email, setEmail] = useState("");
    useEffect(() => {
        if (!token) {
            setEmail("");
        } else {
            axios.post("http://localhost/SL Project/CS699_Project/protected_endpoint.php", {"token":token}).then(response => {
                if(response.data.message === "Access granted"){
                    setEmail(response.data.user_id);
                }else{
                    setEmail("");
                }
            })
        }
    }, []);
    const handleChange = (event) => {
        const selectedSort = event.target.value;
        setSortOn(selectedSort);
        if (selectedSort === "duration"){
            const array = Object.entries(flights).sort(([,a],[,b]) => {
                const varA = a[0].Flight_Duration || "";
                const varB = b[0].Flight_Duration || "";
                return varA.localeCompare(varB);
            });
            const map = new Map(array);
            var dict = [];
            map.forEach((values, keys) => {
                dict.push(values);
            });
            setResults(dict);
        } else if (selectedSort === "takeOff"){
            const array = Object.entries(flights).sort(([,a],[,b]) => {
                const varA = a[0].time_takeoff || "";
                const varB = b[0].time_takeoff || "";
                return varA.localeCompare(varB);
            });
            const map = new Map(array);
            var dict = [];
            map.forEach((values, keys) => {
                dict.push(values);
            });
            setResults(dict);
        } else if (selectedSort === "landing"){
            const array = Object.entries(flights).sort(([,a],[,b]) => {
                const varA = a[0].time_landing || "";
                const varB = b[0].time_landing || "";
                return varA.localeCompare(varB);
            });
            const map = new Map(array);
            var dict = [];
            map.forEach((values, keys) => {
                dict.push(values);
            });
            setResults(dict);
        } else {
            const array = Object.entries(flights).sort(([,a],[,b]) => {
                const varA = a[0].price || "";
                const varB = b[0].price || "";
                return varA.localeCompare(varB);
            });
            const map = new Map(array);
            var dict = [];
            map.forEach((values, keys) => {
                dict.push(values);
            });
            setResults(dict);
        }
    }
    res.map((flight, key) =>{
        if(flight[0].type === "Booking available"){
            flight[0]['isBook'] = "Book";
        } else {
            flight[0]['isBook'] = "Link";
        }
    });
    const navigate = useNavigate();
    const handleBook = (fName, fDate, fTakeOff, fSorurce, fDestination) => {
        const dataToSend = {"email" : email, 
                            "flight_name": fName,
                            "flight_date" : fDate,
                            "departure_time" : fTakeOff,
                            "source_city" : fSorurce,
                            "destination_city" : fDestination
        };
        navigate('/bookTicket', { state: dataToSend });
    }
  return (
    <div>
    <div className="sort-container">
        <h3>Sort By</h3>
        <select name='sort' id='sort' onChange={handleChange}>
            <option value="">--Sort By--</option>
            <option value="price">Price</option>
            <option value="takeOff">Time take off</option>
            <option value="landing">Time landing</option>
            <option value="duration">Duration</option>
        </select>
    </div>
    <div class="results-container">
        <h3>Found Flights</h3>
        {res.map((flight, key) =>
        <div class="flight-card">
            <div class="flight-info">
                <div class="type">{flight[0].type}</div>
                <img class="flight-logo" src={flight[0].img} alt={flight[0].img}/>
                <p><div>{flight[0].Flight_name}</div></p>
                <p>{flight[0].Source}</p>
                <p><div class="flight-time">{flight[0].time_takeoff}</div></p>
                <p>
                    <div class="flight-dur">{flight[0].Flight_Duration}</div>
                    <hr/>
                    <div class="flight-dur">{flight[0].direct_flight_status}</div>
                </p>
                <p><div  class="flight-time">{flight[0].time_landing}</div></p>
                <p>{flight[0].Destination}</p>
                <p>&#8377;{flight[0].price}</p>
                {flight[0].isBook === "Book" ? 
                    <button class="link" onClick={() => handleBook(flight[0].Flight_name, flight[0].Flight_Date, 
                        flight[0].time_takeoff, flight[0].Source, flight[0].Destination
                    )}><a href="#">{flight[0].isBook}</a></button> :
                    <button class="link"><a href={flight[0].website_link} target="_blank">{flight[0].isBook}</a></button>}
            </div>
        </div>
        )}
    </div>
    </div>
  )
}

export default Results