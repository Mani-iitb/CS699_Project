import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Results from '../components/Results';
import './SearchBar.css';

function SearchBar() {
    const [inputs, setInputs] = useState();
    const [flights, setflights] = useState();
    const [showSearch, setShowSearch] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    function getFlights(){
        try {
            axios({
                method: "get",
                url: "http://localhost/CS699_Project/?",
                params: {
                  source: inputs.source,
                  destination: inputs.destination,
                  date: inputs.date
                }
              }).then(function(response) {
                console.log(response.data);
                setflights(response.data);
                setShowResults(true);
                setShowSearch(true);
            });
        } catch(error){
            console.log("error");
            console.log(error);
            navigate('/error');
        }
        
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (typeof inputs === "undefined") {
            alert("Please select all the inputs");
         }
        else if ( !("source" in inputs) || !("destination" in inputs) || !("date" in inputs)){
            alert('Please select all the inputs');
        }
        else if (inputs.source === inputs.destination){
            alert('You\'ve selected same source and destination as"' + inputs.source + '".\nPlease choose another.');
            inputs.destination='';
            document.getElementById("destination").value='';
        } else if(inputs.source === '' || inputs.destination === ''){
            alert('Please select all the inputs');
        } else {
            getFlights();
            console.log(inputs);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
        console.log(inputs);
    }
      
  return (
    <div>
        <div class='search-container'>
            <form class="search-form" onSubmit={handleSubmit}>
                <h1>Search Flight</h1>
                    <select name='source' id='source' onChange={handleChange}>
                        <option value="">--Source--</option>
                        <option value="Bombay">Bombay</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">GOA</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Rajkot">Rajkot</option>
                    </select>
                    <select name='destination' id='destination' onChange={handleChange}>
                        <option value="">--Destination--</option>
                        <option value="Bombay">Bombay</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">GOA</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Jaipur">Jaipur</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Rajkot">Rajkot</option>
                    </select>
                    <input type="date" name="date" onChange={handleChange}/>
                    <input type="submit" value="Submit"/>      
                  </form>
              </div>
        {showResults ? <Results flights={flights}/> : null}
    </div>
  )
}

export default SearchBar