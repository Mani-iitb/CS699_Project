import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './signin.css'; // Import any CSS styles specific to the modal
import './signup';
function Signin({ onClose,onOpen }) {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    email: '',
    password: '' // Corrected spelling from 'passward' to 'password'
  });
  const [errors, setErrors] = useState({});

  // Close modal when clicking outside of it
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

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };
  const Nav =()=>{
    onClose();
    onOpen();
  }

  const validateForm = () => {
    const errors = {};

    // Email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) { // Corrected this line
      errors.email = "Invalid email format";
    }

    // Password validation
    if (!formData.password) { // Corrected spelling to 'password'
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Logged In");
      onClose();
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="signin-modal-overlay">
      <div className="signin-modal-content" ref={modalRef}>
        {/* Modal header */}
        <div className="signin-modal-header">
          <h5>Login to Airline Booking</h5>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Modal body with form */}
        <div className="signin-modal-body">
          <form id="signin-form" className="form" method="post" onSubmit={handleSubmit}>
            <div className="input-group form-group">
              <label htmlFor="email">Email&nbsp;&nbsp;</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {/* Correctly display email errors */}
              {errors.email && <span className='error'>{errors.email}</span>}
            </div>

            <div className="input-group form-group">
              <label htmlFor="password">Password&nbsp;&nbsp;</label>
              <input
                type="password"
                className="form-control"
                id="password" // Corrected from 'passward' to 'password'
                name="password"
                placeholder="Enter your password"
                value={formData.password} // Corrected from 'formData.passward' to 'formData.password'
                onChange={handleChange}
              />
              {/* Correctly display password errors */}
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </div>

        {/* Modal footer */}
        <div className="signin-modal-footer">
          <span>
            Don't have an account?&nbsp;
            <a href='#' onClick={Nav}>Sign up here</a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signin;
