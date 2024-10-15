import { BrowserRouter, Route, Routes, Link} from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import Error from './components/Error';
import './App.css';
import logo from './images/logo.png';
import React from 'react';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <nav className='navbar'>
          <nav className='navbar-container'>
            <Link to="/" className='navbar-logo'>
              <img src={logo} className='header-logo' alt='logo'/>
            </Link>
          </nav>
        </nav>
        <Routes>
          <Route index element={<SearchBar/>}/>
          <Route path="error" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
