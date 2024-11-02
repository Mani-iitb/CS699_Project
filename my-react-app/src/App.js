import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Error from './components/Error';
import Signin from './components/signin'; 
import Signup from './components/signup'; 
import Destinations from './components/destination';

function App() {
    const [showSignin, setShowSignin] = useState(false); // State to manage Signin modal visibility
    const [showSignup, setShowSignup] = useState(false); // State to manage Signup modal visibility
    const [isLoggedIn, setLogin] =useState(false);
    const [name, setName]=useState("");

    const handleLogin=(name)=>{
        setName(name);
        setLogin(true);
        
    }

    return (
        <div className="App">
            <BrowserRouter>
                <div className="p-3 m-0 border-0 bd-example">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <i className="fa-solid fa-plane-departure">&nbsp;</i>
                            <a className="navbar-brand" href="#">&nbsp;Airline booking</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">About</a>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Menu
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li><a className="dropdown-item" href="#">Book Food</a></li>
                                            <li><a className="dropdown-item" href="#">Holiday Packages</a></li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <li><a className="dropdown-item" href="#">Travel Insurance</a></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">Offers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">Seats</a>
                                    </li>
                                    <li>
                                        <Link to="/destination" className="nav-link">Destinations</Link>
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
                                                    <button type="button" className="btn btn-secondary btn-sm" style={{fontSize:'10px'}}>Settings</button>
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
                    <Route path="error" element={<Error />} />
                    <Route path='/destination' element = {<Destinations/>}/>
                </Routes>
            </BrowserRouter>

            {/* Modals - Conditionally render based on state */}
            {showSignin && <Signin onClose={() => setShowSignin(false)} onOpen={()=> setShowSignup(true)} handleLogin={(name) => handleLogin(name)}/>}
            {showSignup && <Signup onClose={() => setShowSignup(false)} />}
        </div>
    );
}

export default App;
