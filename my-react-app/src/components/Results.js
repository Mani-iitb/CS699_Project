import React from 'react'
import "./Results.css"

function Results({flights}) {
    console.log(flights);
    flights.map((flight, key) => {
        console.log(flight[0]);
    });
  return (
    <div class="results-container">
        <h3>Found Flights</h3>
        {/* <div class="flight-header">
            <p>Source</p>
            <p>Destination</p>
            <p>Flight_name</p>
            <p>Flight_Date</p>
            <p>Flight_Duration</p>
            <p>time_takeoff</p>
            <p>time_landing</p>
            <p>price</p>
            <p>direct_flight_status</p>
        </div> */}
        {flights.map((flight, key) =>
        <div class="flight-card">
            <div class="flight-info">
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
                <button class="link">Link</button>
            </div>
        </div>
        )}
    </div>
  )
}

export default Results