import React, { useState, useEffect, lazy } from "react";
import axios from "axios";
import FlashMessage from "./flash";

function ShowHistory() {
    const [loading, setLoading] = useState(true);
    const [bookingHistory, setBookingHistory] = useState([]);
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const token = localStorage.getItem("token");
    const [isReceived, setisReceived] = useState(false);
    const [flashMessage, setFlashMessage] = useState({ message: '', type: '' });

    useEffect(()=>{
        if (!token) {
            setEmail("");
            setFlashMessage({message: "Login to access this page", type: "error"});
        } else {
            axios.post("http://localhost/SL Project/CS699_Project/protected_endpoint.php", {"token":token}).then(response => {
                if(response.data.message === "Access granted"){
                    setEmail(response.data.user_id);
                    setFlashMessage({message: "", type: ""});
                    setisReceived(true);
                    setisLoggedIn(true);
                }else{
                    setEmail("");
                    setFlashMessage({message: "Login to access this page", type: "error"});
                }
            })
        }
    }, []);
    console.log(email);

   
    function displayData(bookingHistory) {
        console.log(bookingHistory);
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

    useEffect( () => {
        console.log(email);
        axios.post("http://localhost/SL%20Project/CS699_Project/getHistory.php", { "email":email })
            .then(response => {
                console.log(response.data.data);
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
    }, [isReceived]);

    if (loading) return (<div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>);
    
    function normal() {
        return (
            <div>
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
                    {
                        displayData(bookingHistory)
                    }
                </tbody>
            </table>
            </div>
            </div>
        )
    }

    return (
        <div>
            {isLoggedIn ? normal() : <FlashMessage message={flashMessage.message} type={flashMessage.type} onClose={() => setFlashMessage({ message: '', type: '' })}/>}
        </div>
    );
}

export default ShowHistory;
