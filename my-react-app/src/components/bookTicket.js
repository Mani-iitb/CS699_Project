import React, { useState } from 'react';
import axios from 'axios';
function BookTicket({email,flight_name,flight_date,departure_time,source_city,destination_city,name,onClose,handleLogin}) {
    
    const [passengers, setPassengers] = useState([{
        name: '',
        age: '',
        gender: 'male',
        preference: '',
        nationality: '',
        travelInsurance: false,
    }]);
    const [subscribe, setSubscribe] = useState(false);
    const [errors, setErrors] = useState({}); 
    const validateForm = () => {
        const newErrors = {};
        passengers.forEach((passenger, index) => {
            
            if (!passenger.name) {
                newErrors[`name-${index}`] = "Passenger's name is required.";
            }
            if (!passenger.age) {
                newErrors[`age-${index}`] = "Passenger's age is required.";
            } else if (passenger.age <= 0) {
                newErrors[`age-${index}`] = "Age must be a positive number.";
            }
            if (!passenger.nationality) {
                newErrors[`nationality-${index}`] = "Nationality is required.";
            }
        });
        return newErrors; 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const formErrors = validateForm();
    
        if (Object.keys(formErrors).length === 0) {
            
            const filteredPassengers = passengers.map((passenger) => ({
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender,
            }));
            
            
            const data = {
                email,
                flight_name,
                flight_date,
                departure_time,
                source_city,
                destination_city,
                passengers: filteredPassengers,
            };
            axios.post("http://localhost/SL%20Project/CS699_Project/bookTicket.php", data)
                .then(response => {
                    console.log(response.data);
                    if (response.data.message === "Error") {
                        alert("An error occurred. Please try again.");
                        
                        
                        setPassengers([{
                            name: '',
                            age: '',
                            gender: 'male',
                            preference: '',
                            nationality: '',
                            travelInsurance: false,
                        }]);
                        setSubscribe(false);
                    } else {
                        
                        localStorage.setItem("token", response.data.token);
                        console.log("Data saved successfully");
                        handleLogin(name); 
                        onClose();
                    }
                })
                .catch(error => {
                    console.error("Error submitting data:", error);
                    alert("Submission failed. Please check your network or try again later.");
                });
        } else {
            
            setErrors(formErrors);
        }
    };
    

    const addPassenger = () => {
        setPassengers([...passengers, {
            name: '',
            age: '',
            gender: 'male',
            preference: '',
            nationality: '',
            travelInsurance: false,
        }]);
    };

    const handlePassengerChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    return (
        <div className='Container' style={{ paddingTop: '60px' }}>
            <div className="card" style={{ width: '70%', margin: '0 auto' }}>
                <h5 className="card-header" style={{ textAlign: 'center' }}>Book Ticket</h5>
                <div className="card-body">
                    <h5 className="card-title">Passenger Info</h5>
                    <form onSubmit={handleSubmit}>
                        {passengers.map((passenger, index) => (
                            <div key={index}>
                                <div className="row mb-3">
                                    <label htmlFor={`name-${index}`} className="col-sm-3 col-form-label">Passenger's Name</label>
                                    <div className="col-sm-9">
                                        <input
                                            type="text"
                                            className={`form-control ${errors[`name-${index}`] ? 'is-invalid' : ''}`}
                                            id={`name-${index}`}
                                            value={passenger.name}
                                            onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                                        />
                                        {errors[`name-${index}`] && <div className="invalid-feedback">{errors[`name-${index}`]}</div>}
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor={`age-${index}`} className="col-sm-3 col-form-label">Passenger's Age</label>
                                    <div className="col-sm-3">
                                        <input
                                            type="number"
                                            className={`form-control ${errors[`age-${index}`] ? 'is-invalid' : ''}`}
                                            id={`age-${index}`}
                                            value={passenger.age}
                                            onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                            placeholder="Enter passenger's age"
                                        />
                                        {errors[`age-${index}`] && <div className="invalid-feedback">{errors[`age-${index}`]}</div>}
                                    </div>
                                    <div className='col-sm-6'>
                                        <select
                                            name='preference'
                                            id={`preference-${index}`}
                                            className={`form-select ${!passenger.preference ? '' : ''}`}
                                            value={passenger.preference}
                                            onChange={(e) => handlePassengerChange(index, 'preference', e.target.value)}
                                        >
                                            <option value="">Select Preference</option>
                                            <option value="Anywhere">Anywhere</option>
                                            <option value="Window Side">Window Side</option>
                                            <option value="Middle">Middle</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor={`nationality-${index}`} className="col-sm-3 col-form-label">Nationality</label>
                                    <div className="col-sm-9">
                                        <select
                                            name='nationality'
                                            id={`nationality-${index}`}
                                            className={`form-select ${errors[`nationality-${index}`] ? 'is-invalid' : ''}`}
                                            value={passenger.nationality}
                                            onChange={(e) => handlePassengerChange(index, 'nationality', e.target.value)}
                                        >
                                            <option value="">Select Nationality</option>
                                            <option value="American">American</option>
                                            <option value="British">British</option>
                                            <option value="Indian">Indian</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        {errors[`nationality-${index}`] && <div className="invalid-feedback">{errors[`nationality-${index}`]}</div>}
                                    </div>
                                </div>
                                <fieldset className="row mb-3">
                                    <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                                    <div className="col-sm-9">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`gender-${index}`}
                                                id={`genderMale-${index}`}
                                                value="male"
                                                checked={passenger.gender === 'male'}
                                                onChange={() => handlePassengerChange(index, 'gender', 'male')}
                                            />
                                            <label className="form-check-label" htmlFor={`genderMale-${index}`}>
                                                Male
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={`gender-${index}`}
                                                id={`genderFemale-${index}`}
                                                value="female"
                                                checked={passenger.gender === 'female'}
                                                onChange={() => handlePassengerChange(index, 'gender', 'female')}
                                            />
                                            <label className="form-check-label" htmlFor={`genderFemale-${index}`}>
                                                Female
                                            </label>
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="row mb-3">
                                    <div className="col-sm-10 offset-sm-2">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id={`travelInsuranceCheck-${index}`}
                                                checked={passenger.travelInsurance}
                                                onChange={() => handlePassengerChange(index, 'travelInsurance', !passenger.travelInsurance)}
                                            />
                                            <label className="form-check-label" htmlFor={`travelInsuranceCheck-${index}`}>
                                                Want Travel Insurance?
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <hr /> {/* Separator between passengers */}
                            </div>
                        ))}
                        <div className="row mb-3">
                            <div className="col-sm-12">
                                <button type="button" className="btn btn-secondary" onClick={addPassenger}>
                                    Add Another Passenger
                                </button>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm-10 offset-sm-2">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="subscribeCheck"
                                        checked={subscribe}
                                        onChange={() => setSubscribe(!subscribe)}
                                    />
                                    <label className="form-check-label" htmlFor="subscribeCheck">
                                        Subscribe to get Mails
                                    </label>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookTicket;
