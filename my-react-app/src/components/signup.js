import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import './signin.css';

function Signup({ onClose }) {
    const modalRef = useRef();

    // State to hold form values and validation errors
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        userType:'',
        password: ''
    });
    const [errors, setErrors] = useState({});

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    // Handle form input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Validate form fields
    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Name is required";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            errors.email = "Invalid email format";
        }

        const contactPattern = /^\d{10}$/; // Validates 10-digit phone number
        if (!formData.contact) {
            errors.contact = "Provide valid contact number is required";
        } else if (!contactPattern.test(formData.contact)) {
            errors.contact = "Invalid contact number, must be 10 digits";
        }
        if(formData.userType!="Customer" || formData.userType!="Service Provider"){
            errors.userType="Chose one either customer or service provider";
        }

        if (!formData.password) {
            errors.password = "Password is required of atleast length 6";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }


        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if no errors
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Form is valid, proceed with submission logic
            alert("Account Created successfully!");
            onClose(); // Close the modal after successful submission
        } else {
            // Form is invalid, show errors
            console.log("Validation errors:", errors);
        }
    };

    return (
        <div className="signin-modal-overlay">
            <div className="signin-modal-content" ref={modalRef}>
                {/* Modal header */}
                <div className="signin-modal-header">
                    <h5>Signup Here</h5>
                    <button className="close-btn" onClick={onClose}>
                        <X />
                    </button>
                </div>

                {/* Modal body with form */}
                <div className="signin-modal-body">
                    <form id="signin-form" className="form" onSubmit={handleSubmit}>
                        <div className='input-group form-group'>
                            <label htmlFor='name'>Name &nbsp;&nbsp;</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                placeholder='Enter your name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="email">Email &nbsp;&nbsp;</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className='input-group form-group'>
                            <label htmlFor='contact'>Contact No&nbsp;&nbsp;</label>
                            <input
                                type='tel'
                                className='form-control'
                                id='contact'
                                placeholder='Enter your contact details'
                                value={formData.contact}
                                onChange={handleChange}
                            />
                            {errors.contact && <span className="error">{errors.contact}</span>}
                        </div>
                        <div className='input-group form-group'>
                            <label htmlFor='Type'>User Type&nbsp;&nbsp;</label>
                            <input
                                type='userType'
                                className='form-control'
                                placeholder='Customer/Service Provider'
                                value={formData.userType}
                                onChange={handleChange}
                            />
                            {errors.userType && <span className='error'>{errors.userType}</span>}

                        </div>
                        <div className="input-group form-group">
                            <label htmlFor="password">Password&nbsp;&nbsp;</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter password more than 6 character"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
