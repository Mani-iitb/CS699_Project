import React, { useState } from 'react';
import './flight_modify.css';
function TabbedForm() {
    const [activeTab, setactiveTab] = useState("add");
    const handleActiveTable = (tab) => {
        setactiveTab(tab);
    };
    const addFlight = () => {
        return (
            <div >
                <h5 className="card-title">Add Flight</h5>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label for="Source_city" className="form-label">Enter Soruce City</label>
                        <input type="text" className="form-control" id="Source_city" />
                    </div>
                    <div className="col-md-6">
                        <label for="Destination_city" className="form-label">Enter Destination_city</label>
                        <input type="text" className="form-control" id="Destination_city" />
                    </div>
                    <div className="col-4">
                        <label for="flight_name" className="form-label">Flight Name</label>
                        <input type="text" className="form-control" id="flight_name" />
                    </div>
                    <div className="col-4">
                        <label for="flight_duration" className="form-label">Flight Duration</label>
                        <input type="text" className="form-control" id="flight_duration" />
                    </div>
                    <div className="col-4">
                        <label for="repeatition" className="form-label">Time after which flight will fly</label>
                        <input type="text" className="form-control" id="repeatition" placeholder='in Days' />
                    </div>
                    <div className="col-md-4">
                        <label for="departure_time" className="form-label">Departure-time</label>
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
                        <label for="date" className="form-label" id='datechoose'>Date</label>
                        <input type="date" className="form-control" id="date" />
                    </div>
                    <div className="col-md-1">
                        <div class="form-check form-switch">
                            <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" for="flexSwitchCheckDefault">Direct</label>
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
                <h5 className="card-title">Remove Flight</h5>
                <form className="row g-3">
                    <div className="col-4">
                        <label for="flight_name" className="form-label">Flight Name</label>
                        <input type="text" className="form-control" id="flight_name" />
                    </div>
                    <div className="col-md-4">
                        <label for="departure_time" className="form-label">Departure-time</label>
                        <input type="text" className="form-control" id="departure_time" placeholder='in 24hrs with - in between' />
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-6">
                        <label for="date" className="form-label" id='datechoose'>Date</label>
                        <input type="date" className="form-control" id="date"placeholder='DD/MM//YYYY' />
                    </div>
                    <div className="col-md-6"></div>
                    <div class="col-3">
                        <button type="submit" className="btn btn-primary">Delete Flight</button>
                    </div>
                </form>
            </div>
        );
    };


    return (
        <div className='Container'>
            <div className="card text-center">
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
            </div>
        </div>
    );
}

export default TabbedForm;