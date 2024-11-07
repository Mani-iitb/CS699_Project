import React, { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import axios from 'axios';
import './flight_modify.css';
import FlashMessage from './flash';
import $ from "jquery";
import backImg from "../images/background.jpg";
function ModifyFlight() {
    const [activeTab, setactiveTab] = useState("add");
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popup_message, setpopup_message] = useState("");
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [isSerProv, setisSerProv] = useState(false);
    const [flashMessage, setFlashMessage] = useState({ message: '', type: '' });
    const handleActiveTable = (tab) => {
        setactiveTab(tab);
    };
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url('${backImg}')`;
    const closePopup = () => {
        setIsPopupOpen(false);
        window.location.reload();
    };
    useEffect(() => {
    setFlashMessage({message: "Login to access this page", type: "error"});
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. Please log in.");
    } else {
        axios.post("http://localhost/SL Project/CS699_Project/protected_endpoint.php", {"token":token}).then(response => {
            if(response.data.message === "Access granted"){
                axios.post("http://localhost/SL Project/CS699_Project/verify_type.php", {"email":response.data.user_id}).then(response =>{
                    if (response.data === "Service Provider"){
                        setisLoggedIn(true);
                        setisSerProv(true);
                        setFlashMessage({message: "", type: ""});
                    }else{
                        setisLoggedIn(true);
                        setisSerProv(false);
                        setFlashMessage({message: "You have to be a service provider to access this page!", type: "error"});
                    }
                })
            }else{
                setFlashMessage({message: "Login to access this page", type: "error"});
            }
        })
    }
}, []);
    const handleAddFlight = (event) => {
        event.preventDefault()
        const form = $(event.target);
        var isdirect;
        var fClass;
        if (form.find('input[id="flexSwitchCheckDefault"]').prop('checked')){
            isdirect = "Non stop";
        } else {
            isdirect = "1 stop";
        }
        if (form.find('select[id="class"]').val() === "B"){
            fClass = 3;
        } else if(form.find('select[id="class"]').val() === "P"){
            fClass = 2;
        } else {
            fClass = 1;
        }
        const data = {
            "source" : form.find('select[id="Source_city"]').val(),
            "destination" : form.find('select[id="Destination_city"]').val(),
            "flight_name" : form.find('input[id="flight_name"]').val(),
            "duration" : form.find('input[id="flight_duration"]').val(),
            "timing" : form.find('input[id="departure_time"]').val(),
            "take_off" : form.find('input[id="takeoff_time"]').val(),
            "landing" : form.find('input[id="landing_time"]').val(),
            "price" : form.find('input[id="price"]').val(),
            "direct" : isdirect,
            "date" : form.find('input[id="date"]').val(),
            "class" : fClass,
        };
        axios.post("http://localhost/SL Project/CS699_Project/add_flight.php", data).then(response =>{
            if(response.data.message === "Inserted"){
                setpopup_message("Flight details added successfully!");
                setIsPopupOpen(true);
            } else {
                setpopup_message("Something went wrong, try again!");
                setIsPopupOpen(true);
            }
        });
    }
    const handleRemoveFlight = (event) => {
        event.preventDefault()
        const form = $(event.target);
        const data = {
            "flight_name" : form.find('input[id="flight_name"]').val(),
            "timing" : form.find('input[id="departure_time"]').val(),
            "date" : form.find('input[id="date"]').val(),
        };
        axios.post("http://localhost/SL Project/CS699_Project/remove_flight.php", data).then(response =>{
            if(response.data.message === "Removed"){
                setpopup_message("Flight details removed successfully!");
                setIsPopupOpen(true);
            } else {
                setpopup_message("No flights found, enter correct flight details!");
                setIsPopupOpen(true);
            }
        });
    }
    const addFlight = () => {
        return (
            <div >
                <h5 className="card-title">Add Flight</h5>
                <form className="row g-3" onSubmit={handleAddFlight}>
                    <div className="col-md-6">
                        <label for="Source_city" className="form-label">Enter Soruce City</label>
                        <select name='Source_city' id='Source_city' className="form-control">
                            <option value="">--Source--</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">GOA</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Pune">Pune</option>
                            <option value="Lucknow">Lucknow</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Hydrebad">Hyderabad</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label for="Destination_city" className="form-label">Enter Destination_city</label>
                        <select name='Destination_city' id='Destination_city' className="form-control">
                            <option value="">--Source--</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Goa">GOA</option>
                            <option value="Ahmedabad">Ahmedabad</option>
                            <option value="Pune">Pune</option>
                            <option value="Lucknow">Lucknow</option>
                            <option value="Kolkata">Kolkata</option>
                            <option value="Hydrebad">Hyderabad</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <label for="flight_name" className="form-label">Flight Name</label>
                        <input type="text" className="form-control" id="flight_name" />
                    </div>
                    <div className="col-4">
                        <label for="flight_duration" className="form-label">Flight Duration</label>
                        <input type="text" className="form-control" id="flight_duration" />
                    </div>
                    <div className="col-md-4">
                        <label for="departure_time" className="form-label">Flight Timings</label>
                        <input type="text" className="form-control" id="departure_time" placeholder='in 24hrs with - in between' />
                    </div>
                    <div className="col-md-4">
                        <label for="takeof_time" className="form-label">Take off time of flight</label>
                        <input type="text" className="form-control" id="takeoff_time" placeholder='in 24hrs' />
                    </div>
                    <div className="col-md-4">
                        <label for="landing_time" className="form-label">Landing Time</label>
                        <input type="text" className="form-control" id="landing_time" placeholder='in 24hrs' />
                    </div>
                    <div className="col-md-6">
                        <label for="price" className="form-label">Price</label>
                        <input type="text" className="form-control" id="price" />
                    </div>
                    <div className="col-md-6">
                        <label for="class" className="form-label">Class</label>
                        <select name='class' id='class' className="form-control">
                            <option value="">--Class--</option>
                            <option value="E">Economy</option>
                            <option value="P">Premium Economy</option>
                            <option value="B">Business</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label for="date" className="form-label" id='datechoose'>Date</label>
                        <input type="date" className="form-control" id="date" />
                    </div>
                    <div className="col-md-1">
                        <div class="form-check form-switch" id="direct">
                            <label className="form-check-label" for="flexSwitchCheckDefault">Direct</label>
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                        </div>
                    </div>
                    <div className='col-mod-11'></div>
                    <div class="col-2">
                        <button type="submit" className="btn btn-primary">Add Flight</button>
                    </div>
                </form>
            </div>
        );
    };
    const deleteFlight = () => {
        return (
            <div >
                <h5 className="card-title" >Remove Flight</h5>
                <form className="row g-3" onSubmit={handleRemoveFlight}>
                    <div className="col-4">
                        <label for="flight_name" className="form-label">Flight Name</label>
                        <input type="text" className="form-control" id="flight_name" />
                    </div>
                    <div className="col-md-4">
                        <label for="departure_time" className="form-label">Flight Timings</label>
                        <input type="text" className="form-control" id="departure_time" placeholder='in 24hrs with - in between' />
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-6">
                        <label for="date" className="form-label" id='datechoose'>Date</label>
                        <input type="date" className="form-control" id="date" placeholder='DD/MM//YYYY' />
                    </div>
                    <div className="col-md-6"></div>
                    <div class="col-3">
                        <button type="submit" className="btn btn-primary">Delete Flight</button>
                    </div>
                </form>
            </div>
        );
    };

    function normal (){
        return (<div>
            <div className="card-header">
            <ul className="nav nav-pills card-header-pills">
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'add' ? 'active' : ''}`}
                        onClick={() => handleActiveTable("add")}
                        href="#">Add Flight</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${activeTab === 'delete' ? 'active' : ''}`}
                        onClick={() => handleActiveTable("delete")}
                        href="#">Remove Flight</a>
                </li>
            </ul>
        </div>
        <div className="card-body">
            {activeTab==='add'?addFlight():deleteFlight()}
        </div>
        </div>)
    }
    return (
        <div>
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup">
                        <p>{popup_message}</p>
                        <button onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
            <div className='cont'>
                <div className="card text-center">
                    {isLoggedIn && isSerProv ? normal() : <FlashMessage message={flashMessage.message} type={flashMessage.type} onClose={() => setFlashMessage({ message: '', type: '' })}/> }
                </div>
            </div>
        </div>
    );
}

export default ModifyFlight;