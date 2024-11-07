import React from 'react'
import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Results from '../components/Results';
import './SearchBar.css';
import SwapImg from '../images/swap.png';
import backImg from '../images/background.jpg';

function SearchBar() {
    var body = document.getElementsByTagName('body')[0];
    body.style.backgroundImage = `url('${backImg}')`;
    const [inputs, setInputs] = useState();
    const [flights, setflights] = useState();
    const [showSearch, setShowSearch] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [noResult, setNoResults] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [toggle, settoggle] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.dest) {
            const name = "destination";
            const value = location.state.dest;
            setSelectedValue(location.state.dest);
            setInputs(values => ({...values, [name]:value}));
        }
    }, [location.state]);

    function getFlights(){
        try {
            axios({
                method: "get",
                url: "http://localhost/SL Project/CS699_Project/?",
                params: {
                  source: inputs.source,
                  destination: inputs.destination,
                  date: inputs.date,
                  type: inputs.type
                }
              }).then(function(response) {
                if(response.data === "0 results"){
                    setNoResults(true);
                    setShowResults(false);
                } else{
                    setflights(response.data);
                    setShowResults(true);
                    setShowSearch(true);
                    setNoResults(false);
                }
                settoggle(!toggle);
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
        else if ( !("source" in inputs) || !("destination" in inputs) || !("date" in inputs) || !("type" in inputs)){
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
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
    }
    const handleChangeDest = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]:value}));
        setSelectedValue(event.target.value);
    }

    const handleSwap = (event) => {
        if(typeof inputs !== 'undefined'){
            if(("source" in  inputs) || ("destination" in inputs)){
                var tempDest='';
                if(("destination" in inputs)){
                    tempDest = inputs.destination;
                }
                var tempSrc='';
                if(("source" in inputs)){
                    tempSrc = inputs.source;
                }
                console.log(inputs);
                inputs.destination = tempSrc;
                document.getElementById("destination").value=tempSrc;
                inputs.source = tempDest;
                document.getElementById("source").value=tempDest;
                setSelectedValue(tempSrc);
                console.log(inputs);
            }
        }
    }
  return (
    <div>
        <div class='search-container'>
            <form class="search-form" onSubmit={handleSubmit}>
                <h1>Search Flight</h1>
                    <select name='source' id='source' onChange={handleChange}>
                        <option value="">--Source--</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">GOA</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hydrebad">Hyderabad</option>
                    </select>
                    <a href="#" class="swap" onClick={handleSwap}><img src={SwapImg}/></a>
                    <select name='destination' id='destination' value={selectedValue} onChange={handleChangeDest}>
                        <option value="">--Destination--</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">GOA</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Pune">Pune</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Hyderabad">Hyderabad</option>
                    </select>
                    <input type="date" name="date" onChange={handleChange}/>
                    <select name='type' id='type' onChange={handleChange}>
                        <option value="">--Select Class--</option>
                        <option value="E">Economy</option>
                        <option value="P">Premium Economy</option>
                        <option value="B">Business class</option>
                    </select> 
                    <input type="submit" value="Submit" onClick={handleSubmit}/>     
                  </form>
              </div>
        <div key={toggle}>
        {noResult ? <div><h1>No Results Found!</h1></div> : null}
        {showResults ? <Results flights={flights}/> : null}
        </div>
    </div>
  )
}
export default SearchBar