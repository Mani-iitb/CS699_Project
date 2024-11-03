import React, { useState } from 'react';

function BookTicket() {
    // State to manage form inputs
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('male'); // Default to male
    const [age, setAge] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [errors, setErrors] = useState({}); // State for error messages

    const validateForm = () => {
        const newErrors = {};
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = "Email is required.";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "Invalid email format.";
        }

        // Name validation
        if (!name) {
            newErrors.name = "Name is required.";
        }

        // Age validation
        if (!age) {
            newErrors.age = "Age is required.";
        } else if (age <= 0) {
            newErrors.age = "Age must be a positive number.";
        }

        return newErrors; // Return the errors object
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const formErrors = validateForm(); // Validate the form

        if (Object.keys(formErrors).length === 0) {
            // No errors, proceed with submission
            console.log({
                email,
                name,
                gender,
                age,
                subscribe
            });
            // Reset form fields after submission (optional)
            setEmail('');
            setName('');
            setAge('');
            setSubscribe(false);
        } else {
            // Set errors to state
            setErrors(formErrors);
        }
    };

    return (
        <div className='Container' style={{paddingTop:'60px'}}>
            <div className="card" style={{width:'70%',margin:'0 auto '}}>
            <h5 className="card-header" style={{textAlign:'center'}}>Book Ticket</h5>
            <div className="card-body">
                <h5 className="card-title">Passenger Info </h5>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <label For="inputEmail3" className="col-sm-3 col-form-label">Passenger's Email ID</label>
                        <div className="col-sm-9">
                            <input
                                type="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                id="inputEmail3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label For="Name" className="col-sm-3 col-form-label">Passenger's Name</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>
                    </div>
                    <fieldset className="row mb-3">
                        <legend className="col-form-label col-sm-2 pt-0">Gender</legend>
                        <div className="col-sm-9">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="genderMale"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={() => setGender('male')}
                                />
                                <label className="form-check-label" For="genderMale">
                                    Male
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="gender"
                                    id="genderFemale"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={() => setGender('female')}
                                />
                                <label className="form-check-label" For="genderFemale">
                                    Female
                                </label>
                            </div>
                        </div>
                    </fieldset>
                    <div className="row mb-3">
                        <label For="age" className="col-sm-3 col-form-label">Passenger's Age</label>
                        <div className="col-sm-9">
                            <input
                                type="number"
                                className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                                id="age"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                placeholder="Enter passenger's age"
                            />
                            {errors.age && <div className="invalid-feedback">{errors.age}</div>}
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
                                <label className="form-check-label" For="subscribeCheck">
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
