import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Link, useLocation, redirect, useNavigate} from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Error from './components/Error';
import Signin from './components/signin'; 
import Signup from './components/signup'; 
import Destinations from './components/destination';
import axios from 'axios';
import ModifyFlight from './components/flight_modify';
import backImg from "./images/background.jpg";
import AboutUs from './components/aboutUs';
import BookTicket from './components/bookTicket';
import ShowHistory from './components/history';

function App() {

    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url('${backImg}')`;
    const [showSignin, setShowSignin] = useState(false); 
    const [showSignup, setShowSignup] = useState(false); 
    const [isLoggedIn, setLogin] =useState(false);
    const [name, setName]=useState("");
    const [email,setEmail]=useState("");

    const handleLogin=(name)=>{
        setName(name);
        setEmail(email);
        setLogin(true);
    }
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("No token found. Please log in.");
        setLogin(false);
    } else {
        axios.post("http://localhost/SL Project/CS699_Project/protected_endpoint.php", {"token":token}).then(response => {
            if(response.data.message === "Access granted"){
                setName(response.data.user_id);
                setLogin(true);
            }else{
                setLogin(false);
            }
        })
    }
}, []);
    const logout = (event) => {
        localStorage.removeItem("token");
        setName("");
        setLogin(false);
        window.location.reload();
    };
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url('${backImg}')`;
    return (
        <div className="App">
            <BrowserRouter>
                <div className="p-3 m-0 border-0 bd-example">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <i className="fa-solid fa-plane-departure">&nbsp;</i>
                            <a className="navbar-brand" href="/">&nbsp;Airline booking</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/aboutUs">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/showHistory" className="nav-link">Booking History</a>
                                    </li>
                                    <li>
                                        <Link to="/destination" className="nav-link">Destinations</Link>
                                    </li>
                                    <li>
                                        <Link to="/flight_modify" className="nav-link">Add Flight</Link>
                                    </li>
                                </ul>
                                <div>
                                    { !isLoggedIn?(
                                        <div>
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <a href="#" className="nav-link" onClick={() => setShowSignup(true)}>
                                                <i className="fas fa-user-plus"></i>
                                                &nbsp; Signup
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link" onClick={() => setShowSignin(true)}>
                                                <i className="fas fa-sign-in-alt"></i>
                                                &nbsp; Signin
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                    ):(
                                        <div>
                                            <ul className='navbar-nav'>
                                                <li className='nav-item' style={{ marginRight: '10px' }}>
                                                    <i className="fa-solid fa-user"></i>
                                                </li>
                                                <li className='nav-item' style={{ marginRight: '10px' }}>
                                                    <span>{name}</span>
                                                </li>
                                                <li className='nav-item'>
                                                    <button type="button" className="btn btn-secondary btn-sm" style={{fontSize:'10px'}} onClick={logout} href="/">Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className='searchBar'>
                    <Routes>
                        <Route index element={<SearchBar />} />
                    </Routes>
                </div>
                {/* Routes */}
                <Routes>
                    
                    <Route path='/destination' element = {<Destinations/>}/>
                    <Route path='/flight_modify' element = {<ModifyFlight/>}/>
                    <Route path='/showHistory' element = {<ShowHistory/>}/>
                    <Route path='/aboutus' element = {<AboutUs/>}/>
                    <Route path='/bookTicket' element = {<BookTicket/>}/>
                    <Route path="error" element={<Error />} />
                </Routes>
            </BrowserRouter>
            
            {showSignin && <Signin onClose={() => setShowSignin(false)} onOpen={()=> setShowSignup(true)} handleLogin={(name,email) => handleLogin(name,email)}/>}
            {showSignup && <Signup onClose={() => setShowSignup(false)} />}
        </div>
    );
}

export default App;
