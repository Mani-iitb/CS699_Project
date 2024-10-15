import React from 'react'

function Results(flights) {
  return (
    <div>
        <h1>flights</h1>
            <table>
                <thead>
                    <tr>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Flight_name</th>
                        <th>Flight_Date</th>
                        <th>Flight_Duration</th>
                        <th>departure_time</th>
                        <th>time_takeoff</th>
                        <th>time_landing</th>
                        <th>price</th>
                        <th>direct_flight_status</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight, key) =>
                        <tr key={key}>
                            <td>{flight.Source}</td>
                            <td>{flight.Destination}</td>
                            <td>{flight.Flight_name}</td>
                            <td>{flight.Flight_Date}</td>
                            <td>{flight.Flight_Duration}</td>
                            <td>{flight.departure_time}</td>
                            <td>{flight.time_takeoff}</td>
                            <td>{flight.time_landing}</td>
                            <td>{flight.price}</td>
                            <td>{flight.direct_flight_status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    </div>
  )
}

export default Results