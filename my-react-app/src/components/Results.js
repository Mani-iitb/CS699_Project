import React from 'react'
import { useState } from 'react';
import "./Results.css"

function Results({flights}) {
    const [sortOn, setSortOn] = useState("price");
    const [res, setResults] = useState(flights);
    const [isBooking, setisBooking] = useState("Third Party");
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
    console.log(res);
    res.map((flight, key) =>{
        if(flight[0].type === "Booking available"){
            flight[0]['isBook'] = "Book";
        } else {
            flight[0]['isBook'] = "Link";
        }
    });
    console.log(res);
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
                    <button class="link"><a href={flight[0].website_link}>{flight[0].isBook}</a></button> :
                    <button class="link"><a href={flight[0].website_link} target="_blank">{flight[0].isBook}</a></button>}
            </div>
        </div>
        )}
    </div>
    </div>
  )
}

export default Results