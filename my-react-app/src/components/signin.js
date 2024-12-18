import React, { useRef, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import './signin.css'; 
import './signup';
import $ from "jquery";
import axios from 'axios';
function Signin({ onClose,onOpen,handleLogin }) {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    email: '',
    password: '' 
  });
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

   
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(formData.email)) { 
      errors.email = "Invalid email format";
    }

    
    if (!formData.password) { 
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
      const form = $(e.target);
      const inData = {"email" : form[0].email.value, "password": form[0].password.value};
      const myEmail=inData.email;
      axios.post("http://localhost/SL Project/CS699_Project/signin.php", inData).then(response =>{
        console.log(response);
          if(response.data.message ==="Invalid password"){
            alert("Wrong Password Try again ...");
            setFormData({
              email: '',
              password: ''
            })
          }
          else{
            localStorage.setItem("token", response.data.token);
            console.log("Login successful, token stored.");
            const name=response.data.name;
            handleLogin(name,myEmail);
            onClose();
            window.location.reload();
          }
      });
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return (
    <div className="signin-modal-overlay">
      <div className="signin-modal-content" ref={modalRef}>
        
        <div className="signin-modal-header">
          <h5>Login to Airline Booking</h5>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        
        <div className="signin-modal-body">
          <form id="signin-form" action='http://localhost/SL Project/CS699_Project/signin.php' className="form" method="post" onSubmit={handleSubmit}>
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
              
              {errors.email && <span className='error'>{errors.email}</span>}
            </div>

            <div className="input-group form-group">
              <label htmlFor="password">Password&nbsp;&nbsp;</label>
              <input
                type="password"
                className="form-control"
                id="password" 
                name="password"
                placeholder="Enter your password"
                value={formData.password} 
                onChange={handleChange}
              />
             
              {errors.password && <span className='error'>{errors.password}</span>}
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
          </form>
        </div>

      
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
