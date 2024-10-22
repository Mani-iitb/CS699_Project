import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import $ from "jquery";
import './signin.css';

function Signup({ onClose }) {
    const modalRef = useRef();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        userType: '',
        password: ''
    });
    const [result, setResult] = useState("");
    const [errors, setErrors] = useState({});

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

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            errors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            errors.email = "Invalid email format";
        }
        const contactPattern = /^\d{10}$/;
        if (!formData.contact) {
            errors.contact = "Contact number is required";
        } else if (!contactPattern.test(formData.contact)) {
            errors.contact = "Invalid contact number, must be 10 digits";
        }
        if (formData.userType !== "Customer" && formData.userType !== "Service Provider") {
            errors.userType = "Choose either customer or service provider";
        }
        if (!formData.password) {
            errors.password = "Password is required with at least length 6";
        } else if (formData.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const form = $(e.target);
            $.ajax({
                type: "POST",
                url: form.attr("action"), 
                data: form.serialize(),
                success(data) {
                    setResult(data);
                    alert("Account Created successfully!");
                    onClose();
                }
            });
        } 
    };

    return (
        <div className="signin-modal-overlay">
            <div className="signin-modal-content" ref={modalRef}>
                <div className="signin-modal-header">
                    <h5>Signup Here</h5>
                    <button className="close-btn" onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className="signin-modal-body">
                    <form
                        id="signin-form"
                        action='http://localhost/SL Project/CS699_Project/my-react-app/PHP/signup.php'
                        method='post'
                        className="form"
                        onSubmit={handleSubmit}
                    >
                        <div className='input-group form-group'>
                            <label htmlFor='name'>Name&nbsp;&nbsp;</label>
                            <input
                                type='text'
                                className='form-control'
                                id='name'
                                name='name'
                                placeholder='Enter your name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <span className="error">{errors.name}</span>}
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="email">Email&nbsp;&nbsp;</label>
                            <input
                                type="email"
                                className="form-control"
                                id='email'
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
                                name="contact"
                                placeholder='Enter your contact details'
                                value={formData.contact}
                                onChange={handleChange}
                            />
                            {errors.contact && <span className="error">{errors.contact}</span>}
                        </div>

                        <div className='input-group form-group'>
                            <label htmlFor='userType'>User Type&nbsp;&nbsp;</label>
                            <select
                                id='userType'
                                className='form-control'
                                name='userType'
                                value={formData.userType}
                                onChange={handleChange}
                            >
                                <option value=''>Select User Type</option>
                                <option value='Customer'>Customer</option>
                                <option value='Service Provider'>Service Provider</option>
                            </select>
                            {errors.userType && <span className='error'>{errors.userType}</span>}
                        </div>

                        <div className="input-group form-group">
                            <label htmlFor="password">Password&nbsp;&nbsp;</label>
                            <input
                                type="password"
                                className="form-control"
                                name='password'
                                id="password"
                                placeholder="Enter password (more than 6 characters)"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                        </div>

                        {result && <span className='result'>{result}</span>}
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Signup;
