import React, { useState, useEffect } from "react";
import axios from "axios";

function ShowHistory({ email }) {
    const [loading, setLoading] = useState(true);
    const [bookingHistory, setBookingHistory] = useState([]);

    // Function to display the data in the table
    function displayData(bookingHistory) {
        return bookingHistory.map(booking => (
            <tr key={booking.booking_id}>
                <td>{booking.email}</td>
                <td>{booking.name}</td>
                <td>{booking.age}</td>
                <td>{booking.flight_name}</td>
                <td>{booking.flight_date}</td>
                <td>{booking.departure_time}</td>
                <td>{booking.source_city}</td>
                <td>{booking.destination_city}</td>
                <td>{booking.gender}</td>
            </tr>
        ));
    }

    useEffect(() => {
        axios.post("http://localhost/SL%20Project/CS699_Project/getHistory.php", { email })
            .then(response => {
                console.log(response.data);
                if (response.data.success === false) {
                    alert("Error: " + response.data.message);
                } else if (!Array.isArray(response.data.data)) {
                    setBookingHistory([]);
                    setLoading(false);
                }
                else {
                    setBookingHistory(response.data.data);
                    setLoading(false);
                }
            })
            .catch(error => {
                console.error("Error in PHP file: ", error);
                alert("Some error occurred in the PHP file.");
            });
    });

    if (loading) return (<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>);

    return (
        <div>
            <h2>Booking History</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Flight Name</th>
                        <th>Flight Date</th>
                        <th>Departure Time</th>
                        <th>Source City</th>
                        <th>Destination City</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {bookingHistory.length > 0 ? (
                        displayData(bookingHistory)
                    ) : (
                        <tr><td colSpan="9">You don't have any booking history.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ShowHistory;
