import React from 'react'
import { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Results from '../components/Results';

function SearchBar() {
    const [inputs, setInputs] = useState();
    const [flights, setflights] = useState();
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    async function getFlights(){
        try {
            const response = await axios.get('http://localhost/api/', inputs)
            console.log(response.data);
            setflights(response.data);
            setShowResults(true);
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
            <h1>SearchBar</h1>
            <form onSubmit={handleSubmit}>
                <table cellSpacing="10">
                    <tbody>
                        <tr>
                            <th>
                                <label>Source:</label>
                            </th>
                            <td>
                                <select name='source' id='source' onChange={handleChange}>
                                    <option value="">--select--</option>
                                    <option value="BOM">Bombay</option>
                                    <option value="BLR">Bangalore</option>
                                    <option value="MAA">Chennai</option>
                                    <option value="DEL">Delhi</option>
                                    <option value="GOI">GOA</option>
                                    <option value="AMD">Gujarat</option>
                                    <option value="HYD">Hydrebad</option>
                                    <option value="IDR">Indore</option>
                                    <option value="CCU">Kolkata</option>
                                    <option value="LKO">Lucknow</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Destination:</label>
                            </th>
                            <td>
                                <select name='destination' id='destination' onChange={handleChange}>
                                    <option value="">--select--</option>
                                    <option value="BOM">Bombay</option>
                                    <option value="BLR">Bangalore</option>
                                    <option value="MAA">Chennai</option>
                                    <option value="DEL">Delhi</option>
                                    <option value="GOI">GOA</option>
                                    <option value="AMD">Gujarat</option>
                                    <option value="HYD">Hydrebad</option>
                                    <option value="IDR">Indore</option>
                                    <option value="CCU">Kolkata</option>
                                    <option value="LKO">Lucknow</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Date:</label>
                            </th>
                            <td>
                                <input type="date" name="date" onChange={handleChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" align="right">
                                <button>Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>             
            </form>
            {showResults ? <Results flights={flights}/> : null}
        </div>
  )
}

export default SearchBar