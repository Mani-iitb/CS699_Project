import React from 'react'

function Results({flights}) {
    console.log(flights);
    flights.map((flight, key) => {
        console.log(flight[0]);
    });
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
                        <th>time_takeoff</th>
                        <th>time_landing</th>
                        <th>price</th>
                        <th>direct_flight_status</th>
                    </tr>
                </thead>
                <tbody>
                    {flights.map((flight, key) =>
                        <tr key={key}>
                            <td>{flight[0].Source}</td>
                            <td>{flight[0].Destination}</td>
                            <td>{flight[0].Flight_name}</td>
                            <td>{flight[0].Flight_Date}</td>
                            <td>{flight[0].Flight_Duration}</td>
                            <td>{flight[0].time_takeoff}</td>
                            <td>{flight[0].time_landing}</td>
                            <td>{flight[0].price}</td>
                            <td>{flight[0].direct_flight_status}</td>
                        </tr>
                    )}
                </tbody>
            </table>
    </div>
  )
}

export default Results