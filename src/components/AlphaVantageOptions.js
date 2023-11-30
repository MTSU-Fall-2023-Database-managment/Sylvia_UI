import React, { useState } from 'react';
// import axios from 'axios';
import './AlphaVantageOptions.css';

function AlphaVantageOptions({ onBackToMain }) {
    const [apiInfoVisible, setApiInfoVisible] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [apiOptions, setApiOptions] = useState(null);

    // const callAlphaVantageApi = async () => {
    //     try {
    //         const response = await axios.get('/alphaVantage'); // Our backend API endpoint
    //         setApiData(response.data);
    //         setApiInfoVisible(false);
    //     } catch (error) {
    //         console.error('Error calling AlphaVantage API', error);
    //     }
    // };

    const showApiOptions = () => {
        setApiOptions(!apiOptions);
        setApiInfoVisible(false);
        setApiData(null);
    };

    const showApiInformation = () => {
        setApiInfoVisible(!apiInfoVisible);
        setApiOptions(false);
        setApiData(null);
    };

    return (
        <div className="alphaVantageContainer">
            <h2>Pulling data from AlphaVantage:</h2>
            <div className="buttonContainer">
                <button onClick={showApiOptions}>Call AlphaVantage API</button>
                <button onClick={showApiInformation}>Information on API</button>
            </div>
            {apiOptions && (
                <div className="apiInfo">
                <div className="apiFunctions">

            <br></br>
            <h3>Select API Function:</h3>
            <br></br>
            </div>
            <div>
            <button className="buttonStyle">1: TIME_SERIES_INTRADAY </button>
            <button className="buttonStyle">2: TIME_SERIES_DAILY </button>
            <button className="buttonStyle">3: TIME_SERIES_WEEKLY </button>
            <button className="buttonStyle">4: TIME_SERIES_MONTHLY </button>
        </div>
            </div>
)}


            {apiInfoVisible && (
                <div className="apiInfo">
                    <div className="apiFunctions">

                <h2>Alpha Vantage API Information</h2>
                <br></br>
                <h3>API Functions:</h3>
                <br></br>
                <ul>
                    <li>
                        <strong>TIME_SERIES_INTRADAY:</strong> Returns the latest 100 data points based on the time interval provided (1min, 5min, 15min, 30min, 60min).
                    </li>
                    <br></br>
                    <li>
                        <strong>TIME_SERIES_DAILY:</strong> Returns raw daily data (date, daily open, daily high, daily low, daily close, daily volume).
                    </li>
                    <br></br>
                    <li>
                        <strong>TIME_SERIES_WEEKLY:</strong> Returns raw weekly data (last trading day of each week, weekly open, weekly high, weekly low, weekly close, weekly volume).
                    </li>
                    <br></br>
                    <li>
                        <strong>TIME_SERIES_MONTHLY:</strong> Returns raw monthly data (last trading day of each month, monthly open, monthly high, monthly low, monthly close, monthly volume).
                    </li>
                </ul>
            </div>
                </div>
            )}

            {apiData && (
                <div className="apiData">
                    <h3>API Data</h3>
                    <pre>{JSON.stringify(apiData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default AlphaVantageOptions;
